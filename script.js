// Importações Oficiais do Firebase via CDN (para funcionar direto no navegador)
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

// ================= AS SUAS CHAVES DO FIREBASE =================
const firebaseConfig = {
  apiKey: "AIzaSyDRZn4fTk1bD8Gpz2TJl2wNO52_5MkOZqk",
  authDomain: "ecoo-food.firebaseapp.com",
  projectId: "ecoo-food",
  storageBucket: "ecoo-food.firebasestorage.app",
  messagingSenderId: "893764543432",
  appId: "1:893764543432:web:a7235eaaaa64f58dd816fd",
  measurementId: "G-N0TFX91M5F"
};

// Inicializar a Base de Dados
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
// =========================================================================

document.addEventListener('DOMContentLoaded', () => {
    // 1. Inicializar Ícones
    lucide.createIcons();

    // 2. Lógica do FAQ (Acordeão)
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach(item => {
        const button = item.querySelector('.faq-button');
        const content = item.querySelector('.faq-content');
        const icon = item.querySelector('.faq-icon');
        const title = item.querySelector('h3');
        const iconContainer = item.querySelector('.icon-container');

        button.addEventListener('click', () => {
            const isOpen = !content.classList.contains('max-h-0');
            
            document.querySelectorAll('.faq-content').forEach(c => c.classList.add('max-h-0', 'opacity-0'));
            document.querySelectorAll('.faq-content').forEach(c => c.classList.remove('max-h-[500px]', 'opacity-100'));
            document.querySelectorAll('.faq-icon').forEach(i => i.classList.remove('rotate-180'));
            document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('border-emerald-500', 'shadow-md'));
            document.querySelectorAll('.faq-item h3').forEach(h => h.classList.replace('text-emerald-700', 'text-slate-800'));
            document.querySelectorAll('.icon-container').forEach(ic => ic.classList.replace('bg-emerald-100', 'bg-slate-50'));
            document.querySelectorAll('.icon-container').forEach(ic => ic.classList.replace('text-emerald-600', 'text-slate-400'));

            if (!isOpen) {
                content.classList.remove('max-h-0', 'opacity-0');
                content.classList.add('max-h-[500px]', 'opacity-100');
                icon.classList.add('rotate-180');
                item.classList.add('border-emerald-500', 'shadow-md');
                title.classList.replace('text-slate-800', 'text-emerald-700');
                iconContainer.classList.replace('bg-slate-50', 'bg-emerald-100');
                iconContainer.classList.replace('text-slate-400', 'text-emerald-600');
            }
        });
    });

    // 3. Menu Mobile
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    let isMenuOpen = false;

    menuBtn.addEventListener('click', () => {
        isMenuOpen = !isMenuOpen;
        if (isMenuOpen) {
            mobileMenu.classList.remove('max-h-0', 'opacity-0', 'invisible');
            mobileMenu.classList.add('max-h-96', 'opacity-100', 'visible');
            menuBtn.innerHTML = '<i data-lucide="x" class="w-6 h-6"></i>';
        } else {
            mobileMenu.classList.add('max-h-0', 'opacity-0', 'invisible');
            mobileMenu.classList.remove('max-h-96', 'opacity-100', 'visible');
            menuBtn.innerHTML = '<i data-lucide="menu" class="w-6 h-6"></i>';
        }
        lucide.createIcons();
    });

    // 4. Navbar Scroll Background
    const navbar = document.getElementById('navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 20) {
            navbar.classList.add('bg-white/80', 'backdrop-blur-lg', 'shadow-lg', 'shadow-emerald-900/5', 'border-b', 'border-white/20', 'py-2');
            navbar.classList.remove('bg-transparent', 'py-4');
        } else {
            navbar.classList.add('bg-transparent', 'py-4');
            navbar.classList.remove('bg-white/80', 'backdrop-blur-lg', 'shadow-lg', 'shadow-emerald-900/5', 'border-b', 'border-white/20', 'py-2');
        }
    });

    // 5. Animações de Scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

    // 6. Formulário da Lista de Espera e Lógica de Envio
    const roleButtons = document.querySelectorAll('.role-btn');
    const dynamicFields = document.getElementById('dynamic-fields');
    const fieldEmpresa = document.getElementById('fields-empresa');
    const fieldOng = document.getElementById('fields-ong');
    const fieldVoluntario = document.getElementById('fields-voluntario');
    let selectedRole = 'Só quero acompanhar';
    
    // Tornar função global para os botões chamarem
    window.selectRoleAndScroll = (role) => {
        document.getElementById('lista-de-espera').scrollIntoView({ behavior: 'smooth' });
        document.querySelector(`.role-btn[data-role="${role}"]`).click();
    };

    roleButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            roleButtons.forEach(b => {
                b.classList.remove('border-emerald-500', 'bg-emerald-50', 'text-emerald-800', 'shadow-sm', 'scale-[1.02]');
                b.classList.add('border-slate-100', 'bg-white', 'text-slate-600');
            });
            
            btn.classList.remove('border-slate-100', 'bg-white', 'text-slate-600');
            btn.classList.add('border-emerald-500', 'bg-emerald-50', 'text-emerald-800', 'shadow-sm', 'scale-[1.02]');
            
            selectedRole = btn.getAttribute('data-role');
            
            if (selectedRole === 'Só quero acompanhar') {
                dynamicFields.classList.replace('max-h-[500px]', 'max-h-0');
                dynamicFields.classList.replace('opacity-100', 'opacity-0');
            } else {
                dynamicFields.classList.replace('max-h-0', 'max-h-[500px]');
                dynamicFields.classList.replace('opacity-0', 'opacity-100');
                
                fieldEmpresa.classList.add('hidden');
                fieldOng.classList.add('hidden');
                fieldVoluntario.classList.add('hidden');
                
                if (selectedRole === 'Quero doar alimentos') fieldEmpresa.classList.remove('hidden');
                if (selectedRole === 'Sou uma ONG') fieldOng.classList.remove('hidden');
                if (selectedRole === 'Quero ser voluntário') fieldVoluntario.classList.remove('hidden');
            }
        });
    });

    // ================= ENVIO PARA O FIREBASE DE VERDADE =================
    const waitlistForm = document.getElementById('waitlist-form');
    const successMsg = document.getElementById('success-message');
    const resetBtn = document.getElementById('reset-form-btn');

    waitlistForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitBtn = waitlistForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = 'A enviar dados...'; // Muda o texto enquanto envia
        submitBtn.disabled = true;

        // 1. Pegar os dados que a pessoa escreveu
        const formData = {
            nome: document.getElementById('input-nome').value,
            email: document.getElementById('input-email').value,
            perfil: selectedRole,
            dataCadastro: serverTimestamp() // Grava a hora exata no Firebase
        };

        // 2. Adicionar os dados extras baseados na escolha
        if (selectedRole === 'Quero doar alimentos') {
            formData.nomeEmpresa = document.getElementById('input-empresa-nome').value;
            formData.tipoEmpresa = document.getElementById('input-empresa-tipo').value;
        } else if (selectedRole === 'Sou uma ONG') {
            formData.nomeOng = document.getElementById('input-ong-nome').value;
            formData.cidade = document.getElementById('input-ong-cidade').value;
        } else if (selectedRole === 'Quero ser voluntário') {
            const veiculoChecked = document.querySelector('input[name="veiculo"]:checked');
            formData.temVeiculo = veiculoChecked ? veiculoChecked.value : 'Não informado';
            formData.cidade = document.getElementById('input-voluntario-cidade').value;
        }

        try {
            // 3. Enviar para a coleção "waitlist" no Firebase
            await addDoc(collection(db, "waitlist"), formData);
            
            // 4. Se der sucesso, mostra a mensagem verde!
            waitlistForm.classList.add('hidden');
            successMsg.classList.remove('hidden');
            
        } catch (error) {
            console.error("Erro ao gravar:", error);
            alert("Aviso: " + error.message + "\n\nSe o erro for 'Missing or insufficient permissions', vá ao seu painel do Firebase -> Firestore Database -> Regras (Rules) e mude 'allow read, write: if false;' para 'allow read, write: if true;' temporariamente.");
        } finally {
            // Volta o botão ao normal
            submitBtn.innerHTML = originalText;
            submitBtn.disabled = false;
        }
    });

    resetBtn.addEventListener('click', () => {
        waitlistForm.reset();
        successMsg.classList.add('hidden');
        waitlistForm.classList.remove('hidden');
    });
    
    // 7. Telemóvel Animação Automática (Apenas visual no Hero)
    const heroScreens = document.querySelectorAll('.hero-screen');
    let currentHeroScreen = 0;
    if(heroScreens.length > 0) {
        setInterval(() => {
            heroScreens[currentHeroScreen].classList.replace('opacity-100', 'opacity-0');
            heroScreens[currentHeroScreen].classList.add('pointer-events-none');
            
            currentHeroScreen = (currentHeroScreen + 1) % heroScreens.length;
            
            heroScreens[currentHeroScreen].classList.replace('opacity-0', 'opacity-100');
            heroScreens[currentHeroScreen].classList.remove('pointer-events-none');
        }, 3500);
    }
});