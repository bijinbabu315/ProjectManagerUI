import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'listFilter'
})
export class ListFilter implements PipeTransform {
filteredItems: any[];
  transform(items: any[], searchText: string, searchType: string): any[] {
    // return empty array if array is falsy
    if (!items) { return []; }

    // return the original array if search text is empty
    if (!searchText) { return items; }

    // convert the searchText to lower case
    searchText = searchText.toLowerCase();

    this.filteredItems = items.filter( it => {
        /*if (it.firstName){
            return it.firstName.toLowerCase().includes(searchText);
        }else if (it.lastName){
            return it.lastName.toLowerCase().includes(searchText);
        }
        else if (it.project){
            if (it.project.project){
                return it.project.project.toLowerCase().includes(searchText);
            }
        }*/
        if (searchType === 'project'){
           return (it.project === null ? false : it.project.toLowerCase().includes(searchText));
        }else if (searchType === 'user'){
            return (it.firstName && it.firstName.toLowerCase().includes(searchText)) ||
            (it.lastName && it.lastName.toLowerCase().includes(searchText));
        }else if (searchType === 'task'){
            return (it.parentTask === null ? false : it.parentTask.toLowerCase().includes(searchText));
        }
    });
    return this.filteredItems;
   }

}
