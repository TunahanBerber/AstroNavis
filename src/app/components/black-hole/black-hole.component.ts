import { Component } from '@angular/core';

@Component({
  selector: 'app-black-hole',
  imports: [],
  templateUrl: './black-hole.component.html',
  styleUrl: './black-hole.component.css'
})
export class BlackHoleComponent {
  buttonTitle = 'Olay ufkunu geçmek üzerisin!';



  triggerAnimatedBlackHole(): void {
    const appRoot = document.querySelector('app-root') as HTMLElement; 
    const button = document.getElementById('black-hole-button') as HTMLElement;
  
    if (!appRoot || !button) return;
  

    const buttonRect = button.getBoundingClientRect();
  
    // Burada bilerek root'a yönlendiriyorum
    appRoot.style.transition = 'all 2s ease-in-out';
    appRoot.style.transformOrigin = 'center'; // Dönüşümün yönünün merkez olmasını istiyorum.
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
          setTimeout(typeWriter, 100); // 100ms hızında yazma
        }
      };
  
      // Daktilo efektini başlat
      typeWriter();
    }, 1000); 
  }
  

}
