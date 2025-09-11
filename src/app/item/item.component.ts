import { Component, OnInit } from '@angular/core';
import { ItemService } from '../services/item.service';
import { Item } from '../models/item.model';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
@Component({
  selector: 'app-item',
  imports: [MatIcon, FormsModule],
  templateUrl: './item.component.html',
  styleUrl: './item.component.css'
})
export class ItemComponent implements OnInit {
  constructor(private itemService : ItemService) {}

  Item: Item[] = [];

  newItem: Item = {
    price:'',
    name: '',
    itemCode:'',
  };

  ngOnInit(): void {
    this.itemService.get().subscribe((data) => {
      this.Item = data;
    });
  }

  addItem() {
    this.itemService.add(this.newItem).subscribe({
      next: (saved) => {

        this.newItem = {
          name: '',
          price:'',
          itemCode: '',
        };
         this.Item.push(saved);
      },
      error: (err) => {
        if (err.status === 409) {
          console.log(err.message);
        } else {
          alert('Error Adding Item, Please Try Again');
        }
      },
    });
  }

  removeItem(id: any) {
    this.itemService.delete(id).subscribe({
      next: () => {
        console.log(`Item with id ${id} deleted`);
        this.Item = this.Item.filter(
          (customer) => customer.itemId !== id
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  updateItem(id: any) {}
}
