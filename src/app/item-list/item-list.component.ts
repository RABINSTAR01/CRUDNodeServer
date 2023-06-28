

// import { Component, OnInit } from '@angular/core';
// import { ItemService } from '../item.service';

// @Component({
//   selector: 'app-item-list',
//   templateUrl: './item-list.component.html',
//   styleUrls: ['./item-list.component.css']
// })
// export class ItemListComponent implements OnInit {
//   items!: any[];
//   successMessage: string | null = null;
//   errorMessage: string | null = null;

//   constructor(private itemService: ItemService) {}

//   ngOnInit(): void {
//     this.getItems();
//   }

//   getItems(): void {
//     this.itemService.getItems().subscribe(
//       items => {
//         this.items = items;
//       },
//       error => {
//         console.error('Error retrieving items:', error);
//       }
//     );
//   }

//   createItem(name: string, description: string): void {
//     const item = {
//       name: name,
//       description: description
//     };

//     this.itemService.createItem(item).subscribe(
//       () => {
//         this.successMessage = 'Item created successfully';
//         this.errorMessage = null;
//         this.getItems(); // Refresh data after creating item
//       },
//       error => {
//         this.successMessage = null;
//         this.errorMessage = 'Error creating item';
//         console.error('Error creating item:', error);
//       }
//     );
//   }

//   updateItem(item: any): void {
//     const updatedItem = {
//       id: item.Id,
//       name: prompt('Enter the updated name:', item.Name) || item.Name,
//       description: prompt('Enter the updated description:', item.Description) || item.Description
//     };

//     this.itemService.updateItem(updatedItem.id, updatedItem).subscribe(
//       () => {
//         this.successMessage = 'Item updated successfully';
//         this.errorMessage = null;
//         this.getItems(); // Refresh data after updating item
//       },
//       error => {
//         this.successMessage = null;
//         this.errorMessage = 'Error updating item';
//         console.error('Error updating item:', error);
//       }
//     );
//   }
  
//   deleteItem(id: number): void {
//     this.itemService.deleteItem(id).subscribe(
//       () => {
//         this.successMessage = 'Item deleted successfully';
//         this.errorMessage = null;
//         this.getItems(); // Refresh data after deleting item
//       },
//       error => {
//         this.successMessage = null;
//         this.errorMessage = 'Error deleting item';
//         console.error('Error deleting item:', error);
//       }
//     );
//   }
// }

import { Component, OnInit } from '@angular/core';
import { ItemService } from '../item.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
  items!: any[];
  successMessage: string | null = null;
  errorMessage: string | null = null;

  constructor(private itemService: ItemService) {}

  ngOnInit(): void {
    this.getItems();
  }

  getItems(): void {
    this.itemService.getItems().subscribe(
      items => {
        this.items = items;
      },
      error => {
        console.error('Error retrieving items:', error);
      }
    );
  }

  createItem(name: string, description: string): void {
    const item = {
      name: name,
      description: description
    };

    this.itemService.createItem(item).subscribe(
      () => {
        this.successMessage = 'Item created successfully';
        this.errorMessage = null;
        this.getItems(); // Refresh data after creating item
        this.autoHideMessage();
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Error creating item';
        console.error('Error creating item:', error);
        this.autoHideMessage();
      }
    );
  }

  updateItem(item: any): void {
    const updatedItem = {
      id: item.Id,
      name: prompt('Enter the updated name:', item.Name) || item.Name,
      description: prompt('Enter the updated description:', item.Description) || item.Description
    };

    this.itemService.updateItem(updatedItem.id, updatedItem).subscribe(
      () => {
        this.successMessage = 'Item updated successfully';
        this.errorMessage = null;
        this.getItems(); // Refresh data after updating item
        this.autoHideMessage();
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Error updating item';
        console.error('Error updating item:', error);
        this.autoHideMessage();
      }
    );
  }
  
  deleteItem(id: number): void {
    this.itemService.deleteItem(id).subscribe(
      () => {
        this.successMessage = 'Item deleted successfully';
        this.errorMessage = null;
        this.getItems(); // Refresh data after deleting item
        this.autoHideMessage();
      },
      error => {
        this.successMessage = null;
        this.errorMessage = 'Error deleting item';
        console.error('Error deleting item:', error);
        this.autoHideMessage();
      }
    );
  }

  autoHideMessage(): void {
    setTimeout(() => {
      this.successMessage = null;
      this.errorMessage = null;
    }, 2000); // Hide message after 2 seconds (adjust the time as needed)
  }
}
