import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-productsfetch',
  standalone: true,
  imports: [HttpClientModule, CommonModule, FormsModule, RouterModule],
  templateUrl: './productsfetch.component.html',
  styleUrl: './productsfetch.component.css'
})
export class ProductsfetchComponent implements OnInit {
  products: any[] = [];
  groupedProducts: { [key: string]: any[] } = {};
  
  categoryOrder = ['HOME PUMPS', 'AGRICULTURE', 'ACCESSORIES', 'WASTE WATER PUMPS'];
  
  searchQuery = '';
  filteredProducts: any[] = [];

  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchProducts();
  }

  fetchProducts() {
    this.http.get<any[]>('https://backend45-p3hk.onrender.com/products')
      .subscribe({
        next: (res) => {
          this.products = res;
          this.filteredProducts = [...res];
          this.groupedProducts = this.groupByCategory(this.filteredProducts);
        },
        error: (err) => console.error('Error fetching products:', err)
      });
  }

  filterProducts() {
    if (!this.searchQuery) {
      this.filteredProducts = [...this.products];
    } else {
      const searchTerm = this.searchQuery.toLowerCase();
      this.filteredProducts = this.products.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        (product.description && product.description.toLowerCase().includes(searchTerm))
      );
    }
    this.groupedProducts = this.groupByCategory(this.filteredProducts);
  }

  showNoResults(): boolean {
    return this.filteredProducts.length === 0 && this.searchQuery.trim() !== '';
  }

  private groupByCategory(products: any[]): { [key: string]: any[] } {
    return products.reduce((acc, product) => {
      const category = product.category.toUpperCase();
      if (!acc[category]) {
        acc[category] = [];
      }
      acc[category].push(product);
      return acc;
    }, {});
  }
  
  onProductClick(product: any): void {
    console.log('Product clicked:', product);
    this.router.navigate([`/viewproduct/${product._id}`]);
  }
  getProducts() {
    this.http.get<any[]>('https://backend45-p3hk.onrender.com/products').subscribe(
      data => {
        this.products = data;
      },
      error => {
        console.error('Failed to load products:', error);
        this.products = [];
      }
    );
  }
  
  
  searchProducts() {
    const query = this.searchQuery.trim();
  
    if (query) {
      this.http.get<any[]>(`https://backend45-p3hk.onrender.com/products?search=${query}`).subscribe(
        data => {
          this.products = data;
        },
        error => {
          console.error('Search error:', error);
          this.products = [];
        }
      );
    } else {
      this.getProducts();
    }
  }
  

  ngAfterViewInit(): void {
    this.filteredProducts = this.products;
    this.route.fragment.subscribe(fragment => {
      if (fragment) {
        const el = document.getElementById(fragment);
        if (el) {
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
}


}