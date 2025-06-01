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
  
  categoryOrder: string[] = [];

  searchQuery = '';
  filteredProducts: any[] = [];

  constructor(private http: HttpClient,private router: Router, private route: ActivatedRoute) {}

  ngOnInit() {
    this.fetchCategories();
    this.fetchProducts();
    this.searchProducts();
  }
  
fetchCategories(): void {
  this.http.get<string[]>('https://backend45-p3hk.onrender.com/categories').subscribe({
    next: (data) => {
      this.categoryOrder = data;
      
    console.log(this.categoryOrder);
    },
    error: (err) => {
      console.error('Failed to load categories', err);
    }
  });
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
  
      const matchedCategory = this.products.find(p =>
        p.category?.toLowerCase() === searchTerm
      )?.category?.toLowerCase();
  
      if (matchedCategory) {
        const top = this.products.filter(p =>
          p.category?.toLowerCase() === matchedCategory
        );
  
        const rest = this.products.filter(p =>
          p.category?.toLowerCase() !== matchedCategory &&
          (
            p.name?.toLowerCase().includes(searchTerm) ||
            p.description?.toLowerCase().includes(searchTerm)
          )
        );
  
        this.filteredProducts = [...top, ...rest];
      } else {
        this.filteredProducts = this.products.filter(product => 
          product.name?.toLowerCase().includes(searchTerm) ||
          product.description?.toLowerCase().includes(searchTerm) ||
          product.category?.toLowerCase().includes(searchTerm)
        );
      }
    }
  
    this.groupedProducts = this.groupByCategory(this.filteredProducts);
  }
  
  showNoResults(): boolean {
    return this.filteredProducts.length === 0 && this.searchQuery.trim() !== '';
  }

  private groupByCategory(products: any[]): { [key: string]: any[] } {
    return products.reduce((acc, product) => {
      const category = product.category || 'Uncategorized'; // Keep category as-is
  
      if (!acc[category]) {
        acc[category] = [];
      }
  
      acc[category].push(product);
      return acc;
    }, {} as { [key: string]: any[] });
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
    const query = this.searchQuery.trim().toLowerCase();
  
    if (query) {
      this.http.get<any[]>('https://backend45-p3hk.onrender.com/products').subscribe(
        data => {
          console.log('Raw product data:', data);
  
          this.products = data;
  
          const categories = ['Accessories', 'Agriculture', 'Home Pumps', 'Waste Water Pumps'];
  
          const matchedCategory = categories.find(cat =>
            cat.toLowerCase().includes(query)
          );
  
          console.log('Matched category:', matchedCategory);
  
          if (matchedCategory) {
            this.filteredProducts = data.filter(p =>
              p.category?.toLowerCase() === matchedCategory.toLowerCase()
            );
            console.log('Filtered by category:', this.filteredProducts);
          } else {
            this.filteredProducts = data.filter(product =>
              product.name?.toLowerCase().includes(query) ||
              product.description?.toLowerCase().includes(query) ||
              product.category?.toLowerCase().includes(query)
            );
            console.log('Filtered by general search:', this.filteredProducts);
          }
  
          this.groupedProducts = this.groupByCategory(this.filteredProducts);
        },
        error => {
          console.error('Search error:', error);
          this.products = [];
          this.filteredProducts = [];
          this.groupedProducts = {};
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