import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router } from '@angular/router'; // Import Router
import * as XLSX from 'xlsx';

export interface User {
  id: string; // Unique ID
  username?: string; // Username can be optional
  email?: string; // Email can be optional
}

@Component({
  selector: 'app-aboutus',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './aboutus.component.html',
  styleUrl: './aboutus.component.css'
})
export class AboutusComponent {
  events: any[] = [];
  users: User[] = []; 
  imageUrls: string[] = [];// Array to hold user data
  errorMessage: string | undefined;
  currentPosition = 0;
 // Array to store fetched events
 filteredEvents: any[] = []; // Array to store filtered events
 selectedEvent: any = null; // Store the currently selected event for editing
 
 eventsLoaded: boolean = false; // Track whether events have been loaded
 selectedYear: string = ''; // Selected year from the dropdown
 years: number[] = []; // Array to store available years
// Variable to hold error messages
autoScrollInterval: any;
loading: boolean = true; // Set this to true/false based on your application's logic



  constructor(private http: HttpClient, private router: Router) {}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false; 
    }, 2000);
    
    this.fetchImageUrls();
  }
  get totalEvents(): number {
    return this.events.length;
  }
  navigateToDashboard(): void {
    this.router.navigate(['/Dashboard']);
  }
  
  async refreshAndFetchImages(): Promise<void> {
    try {
      console.log('Refreshing image data...');
      console.log('Image data refreshed');
      await this.fetchImageUrls();
    } catch (error) {
      console.error('Error refreshing and fetching images:', error);
    }
  }

  async fetchImageUrls(): Promise<void> {
    try {
      console.log('Fetching images from backend...');
       } catch (error) {
      console.error('Error fetching images:', error);
    }
  }

  private handleError(error: any): void {
    console.error('An error occurred:', error);
  
    alert('Failed to load images. Please try again later.');
  }
  
moveGallery(direction: string): void {
  const galleryWidth = 320;
  const totalImages = this.imageUrls.length;

  if (direction === 'left' && this.currentPosition > 0) {
    this.currentPosition--;
  } else if (direction === 'right' && this.currentPosition < totalImages - 1) {
    this.currentPosition++;
  }

  const offset = -this.currentPosition * galleryWidth;  
  const galleryWrapper = document.querySelector('.gallery-wrapper') as HTMLElement;
  galleryWrapper.style.transform = `translateX(${offset}px)`;
}
downloadExcel(): void {
  const formattedEvents = this.events.map(event => ({
    'Event Name': event.event_name,
    Description: event.description,
    'Event Time': new Date(event.event_time).toLocaleString(),
    Location: event.event_location,
    'Event Co-ordinator': event.event_speaker,
   
    'Image URL': event.image_url || ''
  }));

  const worksheet = XLSX.utils.json_to_sheet(formattedEvents);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, 'Events');

  XLSX.writeFile(workbook, 'Events_List.xlsx');
}

}
