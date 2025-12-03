package at.ac.htlleonding

import android.Manifest
import android.content.pm.PackageManager
import android.graphics.Color
import android.os.Bundle
import androidx.activity.result.contract.ActivityResultContracts
import androidx.appcompat.app.AppCompatActivity
import androidx.core.content.ContextCompat
import at.ac.htlleonding.databinding.ActivityMainBinding
import com.google.zxing.ResultPoint
import com.journeyapps.barcodescanner.BarcodeCallback
import com.journeyapps.barcodescanner.BarcodeResult
import okhttp3.Call
import okhttp3.Callback
import okhttp3.MediaType.Companion.toMediaType
import okhttp3.OkHttpClient
import okhttp3.Request
import okhttp3.RequestBody.Companion.toRequestBody
import okhttp3.Response
import java.io.IOException

class MainActivity : AppCompatActivity() {

    private lateinit var binding: ActivityMainBinding

    private val client = OkHttpClient()

    private val backendUrl = "http://10.0.2.2:8080/tickets/scan"

    // Debounce gegen Doppel-Scans
    private var lastContent: String? = null
    private var lastTime: Long = 0
    private val debounceMs = 2000L

    private var scanningEnabled = true

    private val askCameraPermission = registerForActivityResult(
        ActivityResultContracts.RequestPermission()
    ) { granted ->
        if (granted) {
            startScanner()
        } else {
            finish()
        }
    }

    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        binding = ActivityMainBinding.inflate(layoutInflater)
        setContentView(binding.root)

        showStatus("Bitte Ticket in den Rahmen halten", neutral = true)

        if (ContextCompat.checkSelfPermission(
                this,
                Manifest.permission.CAMERA
            ) == PackageManager.PERMISSION_GRANTED
        ) {
            startScanner()
        } else {
            askCameraPermission.launch(Manifest.permission.CAMERA)
        }
    }

    private fun startScanner() {
        binding.barcodeScanner.decodeContinuous(object : BarcodeCallback {
            override fun barcodeResult(result: BarcodeResult?) {
                val text = result?.text ?: return

                if (!scanningEnabled) return

                val now = System.currentTimeMillis()
                if (text == lastContent && now - lastTime < debounceMs) {
                    return
                }

                lastContent = text
                lastTime = now

                scanningEnabled = false

                showStatus("Gescannter Code: $text", neutral = true)
                sendToBackend(text)
            }

            override fun possibleResultPoints(resultPoints: MutableList<ResultPoint>?) {
                // ignorieren
            }
        })
        binding.barcodeScanner.resume()
    }

    /**
     * JSON-Text aus dem QR-Code:
     * {
     *   "ticketNumber": 50057,
     *   "visitType": "Eintritt Dauerausstellung",
     *   "ticketType": "1 Erwachsener",
     *   "customerType": "Standardbesucher",
     *   "priceGroup": "Regulär"
     * }
     */

    private fun sendToBackend(content: String) {
        val json = content.trim()

        showStatus("Sende: $json", neutral = true)

        val mediaType = "application/json; charset=utf-8".toMediaType()
        val body = json.toRequestBody(mediaType)

        val request = Request.Builder()
            .url(backendUrl)
            .post(body)
            .build()

        client.newCall(request).enqueue(object : Callback {
            override fun onFailure(call: Call, e: IOException) {
                showStatus("Server nicht erreichbar", success = false)

                binding.root.postDelayed({
                    scanningEnabled = true
                }, debounceMs)
            }

            override fun onResponse(call: Call, response: Response) {
                val code = response.code
                val ok = response.isSuccessful
                response.close()

                when {
                    ok -> {
                        showStatus("Scan erfolgreich", success = true)
                    }

                    code == 409 -> {
                        showStatus("Ticket bereits gescannt", success = false)
                    }

                    else -> {
                        showStatus("Ticket nicht erkannt (HTTP $code)", success = false)
                    }
                }
                binding.root.postDelayed({
                    scanningEnabled = true
                }, debounceMs)
            }
        })
    }

    private fun showStatus(message: String, success: Boolean? = null, neutral: Boolean = false) {
        runOnUiThread {
            binding.statusText.text = message

            val color = when {
                neutral -> Color.WHITE
                success == true -> Color.parseColor("#4CAF50")
                else -> Color.parseColor("#F44336")
            }
            binding.statusText.setTextColor(color)
        }
    }

    override fun onResume() {
        super.onResume()
        if (::binding.isInitialized) {
            binding.barcodeScanner.resume()
        }
    }

    override fun onPause() {
        if (::binding.isInitialized) {
            binding.barcodeScanner.pause()
        }
        super.onPause()
    }
}
