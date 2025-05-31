import { Component, OnInit,HostListener  } from '@angular/core';
import { HttpClientModule,HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { RouterModule } from '@angular/router';
import { CommonModule  } from '@angular/common';

interface Product {
  _id: string;
  name: string;
  category: string;
}
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HttpClientModule, RouterModule, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isDarkMode: boolean = false; 
  isLoading: boolean = false;
  menuActive: boolean = false; 
 loading: boolean = true;
activeCategory: string | null = null;
 categories: string[] = [];
 
 
productsByCategory: { [category: string]: Product[] } = {};
 showDropdown = false;

 constructor(private router: Router, private http: HttpClient) {} 
 fetchCategories(): void {
  this.showDropdown = true;
  this.http.get<string[]>('https://backend45-p3hk.onrender.com/categories').subscribe({
    next: (data) => this.categories = data,
    error: (err) => console.error('Error fetching categories:', err)
  });
}

fetchProductsByCategory(category: string): void {
  this.activeCategory = category;
  if (this.productsByCategory[category]) return;

  this.http.get<any[]>('https://backend45-p3hk.onrender.com/products').subscribe({
    next: (products) => {
      this.productsByCategory[category] = products.filter(p => p.category === category);
    },
    error: (err) => console.error('Error fetching products:', err)
  });
}

hideDropdown(): void {
  this.showDropdown = false;
  this.activeCategory = '';
}

onProductClick(product: any): void {
  console.log('Product clicked:', product);
  window.location.href = `/viewproduct/${product._id}`;
}

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false; 
    }, 2000);
    if (typeof window !== 'undefined') {
      const darkModePreference = localStorage.getItem('darkMode');
      if (darkModePreference === 'true') {
        this.isDarkMode = true;
        document.body.classList.add('dark-mode');
      } else {
        document.body.classList.remove('dark-mode');
      }
    }

  }
  isMenuOpen = false;
  
  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }
  closeMenu() {
    this.isMenuOpen = false; 
  }

  
  navigateToproductfetch(): void {
    this.closeMenu();
    this.showLoading();
    this.router.navigate(['/products']).finally(() => this.hideLoading());
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  
    
  }
  navigateTocarrer(): void{
    
    this.closeMenu();
    this.showLoading();
    this.router.navigate(['/carrer']).finally(() => this.hideLoading());
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
  splitIntoTwoWordLines(name: string): string[] {
    if (!name) return [];
    const words = name.split(' ');
    const lines = [];
    for (let i = 0; i < words.length; i += 4) {
      lines.push(words.slice(i, i + 4).join(' '));
    }
    return lines;
  }
  
  navigateTohome(): void {
    this.closeMenu();
   
    this.showLoading();
    
    this.router.navigate(['/']).finally(() => this.hideLoading());
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  

  navigateToaboutus(): void {
    this.closeMenu(); 
   
    this.showLoading();
    this.router.navigate(['/Aboutus']).finally(() => this.hideLoading());
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateTocontact(): void {
    this.closeMenu();
    this.showLoading();
    this.router.navigate(['/Contact']).finally(() => this.hideLoading());
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateTocontactus(): void {
    this.closeMenu();
    this.showLoading();
    this.router.navigate(['/Contactus']).finally(() => this.hideLoading());
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navigateTowhatwedo(): void {
    this.closeMenu();
    this.showLoading();
    this.router.navigate(['/What-we-do']).finally(() => this.hideLoading());
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private showLoading(): void {
    this.isLoading = true; 
    console.log('Loading started');
  }

  private hideLoading(): void {
    this.isLoading = false;
    console.log('Loading finished');
  }
  @HostListener('document:click', ['$event'])
  handleOutsideClick(event: Event) {
    const target = event.target as HTMLElement;
    if (!target.closest('#mobile-menu')) {
      this.closeMenu(); 
    }
  }
}
