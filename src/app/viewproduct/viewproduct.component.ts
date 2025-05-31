import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [CommonModule,HttpClientModule], // Remove HttpClientModule from here
  templateUrl: './viewproduct.component.html',
  styleUrls: ['./viewproduct.component.css']
})
export class ViewproductComponent implements OnInit {
  @ViewChild('carouselContainer') carousel!: ElementRef;
  productId: string = '';
  product: any = null;
  loading: boolean = true;
  error: string = '';
  selectedImage: string = '';

  constructor(private route: ActivatedRoute, private http: HttpClient) {}

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';
    if (this.productId) {
      this.fetchProductDetails(this.productId);
    } else {
      this.error = 'No product ID provided.';
      this.loading = false;
    }
  }

  scrollCarousel(direction: 'left' | 'right') {
    const currentIndex = this.product.images.findIndex((img: string) => img === this.selectedImage);
    const lastIndex = this.product.images.length - 1;
  
    if (direction === 'left') {
      // If at first image, go to last, else go previous
      this.selectedImage = currentIndex === 0
        ? this.product.images[lastIndex]
        : this.product.images[currentIndex - 1];
    } else if (direction === 'right') {
      // If at last image, go to first, else go next
      this.selectedImage = currentIndex === lastIndex
        ? this.product.images[0]
        : this.product.images[currentIndex + 1];
    }
  }
  
  
  selectImage(imgUrl: string) {
    this.selectedImage = imgUrl;
  }

  fetchProductDetails(id: string): void {
    this.http.get<any>(`https://backend45-p3hk.onrender.com/products/${id}`).subscribe({
      next: (data) => {
        this.product = data;
        this.selectedImage = data.images?.[0] || '';
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Failed to load product details.';
        console.error(err);
        this.loading = false;
      }
    });
  }
}