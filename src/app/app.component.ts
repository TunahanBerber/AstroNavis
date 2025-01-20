import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NasaGalleryComponent } from './components/nasa-gallery/nasa-gallery.component';
import { HeroSectionComponent } from './shared/components/hero-section/hero-section.component';
import { SharedModule } from './shared/shared.module';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NasaGalleryComponent,HeroSectionComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'] // Updated from styleUrl to styleUrls
})
export class AppComponent {
  title = 'AstroNavis';
  buttonTitle = 'Olay ufkunu geçmek üzerisin!';



  triggerAnimatedBlackHole(): void {
    const appRoot = document.querySelector('app-root') as HTMLElement; // Tüm kök bileşeni seçiyoruz
    const button = document.getElementById('black-hole-button') as HTMLElement; // Buton
  
    if (!appRoot || !button) return;
  
    // Butonun pozisyonunu al
    const buttonRect = button.getBoundingClientRect();
  
    // Uygulama köküne animasyon uygula
    appRoot.style.transition = 'all 2s ease-in-out';
    appRoot.style.transformOrigin = 'center'; // Dönüşümün merkezi
    appRoot.style.transform = `translate(${buttonRect.left - window.innerWidth / 2}px, ${buttonRect.top - window.innerHeight / 2}px) scale(0)`;
    appRoot.style.opacity = '0';
  
    // Arka planı karartmaya başla
    document.body.style.transition = 'background-color 3s ease';
    document.body.style.backgroundColor = 'black';
  
    // Animasyon bitince ekranı temizle ve mesaj göster
    setTimeout(() => {
      // Tüm içerik silinir
      document.body.innerHTML = '';
  
      // Yeni mesaj alanı eklenir
      document.body.style.display = 'flex';
      document.body.style.justifyContent = 'center';
      document.body.style.alignItems = 'center';
      document.body.style.height = '100vh';
      document.body.style.color = 'white';
      document.body.style.fontFamily = 'Orbitron, sans-serif';
      document.body.style.fontSize = '24px';
  
      // Mesaj elemanını oluştur ve ekle
      const messageElement = document.createElement('div');
      messageElement.style.textAlign = 'center';
      document.body.appendChild(messageElement);
  
      // Daktilo efektiyle yazılacak mesaj
      const messageText = 'Işık, karadeliğin çekiminden kurtulamaz; tıpkı bilginin kaçamadığı gibi.';
      let currentIndex = 0;
  
      // Daktilo yazma fonksiyonu
      const typeWriter = () => {
        if (currentIndex < messageText.length) {
          messageElement.textContent += messageText[currentIndex];
          currentIndex++;
          setTimeout(typeWriter, 100); // 100ms hızında yazma (isteğe göre ayarlanabilir)
        }
      };
  
      // Daktilo efektini başlat
      typeWriter();
    }, 1000); // 2 saniyelik animasyon süresi
  }
  
  
}

