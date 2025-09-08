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
    id: '',
    name: '',
    item_code:'',
  };

  ngOnInit(): void {
    this.itemService.get().subscribe((data) => {
      this.Item = data;
    });
  }

  addItem() {
    this.itemService.add(this.newItem).subscribe({
      next: (saved) => {
        this.Item.push(saved);
        this.newItem = {
          name: '',
          price:'',
          id: '',
          item_code: '',
        };
      },
      error: (err) => {
        if (err.status === 409) {
          alert(err.message);
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
          (customer) => customer.id !== id
        );
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
  updateItem(id: any) {}
}
