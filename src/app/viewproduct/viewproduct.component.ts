import { Component, OnInit, ViewChild, ElementRef, Inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

@Component({
  selector: 'app-viewproduct',
  standalone: true,
  imports: [CommonModule],
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
  isBrowser: boolean;

  constructor(
    private route: ActivatedRoute,
    private http: HttpClient,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    this.isBrowser = isPlatformBrowser(this.platformId);
  }

  ngOnInit(): void {
    if (this.isBrowser) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

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
      this.selectedImage = currentIndex === 0
        ? this.product.images[lastIndex]
        : this.product.images[currentIndex - 1];
    } else if (direction === 'right') {
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
