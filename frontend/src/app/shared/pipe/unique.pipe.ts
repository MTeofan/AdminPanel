// unique.pipe.ts
import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'unique'
})
export class UniquePipe implements PipeTransform {
    transform(value: any[], field: string): any[] {
        if (!value || !field) return value;
        const uniqueValues = new Set();
        return value.filter(item => {
            const val = item[field];
            if (uniqueValues.has(val)) {
                return false;
            } else {
                uniqueValues.add(val);
                return true;
            }
        });
    }
}
