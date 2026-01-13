// ==========================================
// IMPORTAÇÃO DE TODAS AS IMAGENS
// ==========================================

// --- Cozinha (Atenção às extensões .png e .jpeg) ---
import fotoCozinha1 from "../assets/img/servicos/cozinha/cozinha1.png";
import fotoCozinha2 from "../assets/img/servicos/cozinha/cozinha2.png";
import fotoCozinha3 from "../assets/img/servicos/cozinha/cozinha3.png";
import fotoCozinha4 from "../assets/img/servicos/cozinha/cozinha4.png";
import fotoCozinha5 from "../assets/img/servicos/cozinha/cozinha5.jpeg"; // Extensão .jpeg
import fotoCozinha6 from "../assets/img/servicos/cozinha/cozinha6.png";
import fotoCozinha7 from "../assets/img/servicos/cozinha/cozinha7.jpeg"; // Extensão .jpeg

// --- Banheiro (.jpeg) ---
import fotoBanheiro1 from "../assets/img/servicos/banheiro/banheiro1.jpeg";
import fotoBanheiro2 from "../assets/img/servicos/banheiro/banheiro2.jpeg";

// --- Quarto (.jpeg) ---
import fotoQuarto1 from "../assets/img/servicos/quarto/quarto1.jpeg";
import fotoQuarto2 from "../assets/img/servicos/quarto/quarto2.jpeg";

// --- Sala (.jpeg) ---
import fotoSala1 from "../assets/img/servicos/sala/sala1.jpeg";
import fotoSala2 from "../assets/img/servicos/sala/sala2.jpeg";
import fotoSala3 from "../assets/img/servicos/sala/sala3.jpeg";
import fotoSala4 from "../assets/img/servicos/sala/sala4.jpeg";

// ==========================================
// DADOS DOS SERVIÇOS
// ==========================================

export const servicesData = [
    // --- COZINHAS ---
    {
        id: 1,
        category: 'COZINHA',
        title: 'Cozinha Planejada Luxo',
        description: 'Design sofisticado com aproveitamento total de espaço.',
        fullDescription: 'Projeto premium com ilha central, armários em laca e iluminação embutida. Ideal para quem busca elegância e funcionalidade.',
        img: fotoCozinha1,
        features: ['Ilha Central', 'Acabamento em Laca', 'Puxadores Ocultos']
    },
    {
        id: 2,
        category: 'COZINHA',
        title: 'Cozinha Compacta Moderna',
        description: 'Soluções inteligentes para apartamentos e espaços reduzidos.',
        fullDescription: 'Otimização máxima para cozinhas pequenas. Armários aéreos até o teto e gavetões profundos para panelas.',
        img: fotoCozinha2,
        features: ['Otimização de Espaço', 'Torre Quente', 'Design Clean']
    },
    {
        id: 3,
        category: 'COZINHA',
        title: 'Estilo Industrial',
        description: 'Combinação de madeira e metal para um visual urbano.',
        fullDescription: 'Cozinha com estruturas metálicas aparentes e madeira em tons quentes. Uma tendência contemporânea e robusta.',
        img: fotoCozinha3,
        features: ['Estrutura Metálica', 'Madeira Rústica', 'Prateleiras Abertas']
    },
    {
        id: 4,
        category: 'COZINHA',
        title: 'Cozinha Clássica',
        description: 'O charme do design tradicional com tecnologia moderna.',
        fullDescription: 'Portas com molduras trabalhadas e puxadores coloniais. O aconchego da cozinha de vó com a durabilidade da marcenaria atual.',
        img: fotoCozinha4,
        features: ['Portas Molduradas', 'Estilo Provençal', 'Amplo Armazenamento']
    },
    {
        id: 5,
        category: 'COZINHA',
        title: 'Cozinha Minimalista',
        description: 'Linhas retas e cores neutras para um ambiente leve.',
        fullDescription: 'Menos é mais. Cozinha em tons de branco e cinza, sem puxadores aparentes (sistema fecho-toque).',
        img: fotoCozinha5,
        features: ['Sistema Touch', 'Cores Neutras', 'Fácil Limpeza']
    },
    {
        id: 6,
        category: 'COZINHA',
        title: 'Cozinha Americana',
        description: 'Integração perfeita entre a cozinha e a sala de jantar.',
        fullDescription: 'Bancada divisória funcional que serve como mesa rápida e apoio para preparo. Perfeita para receber amigos.',
        img: fotoCozinha6,
        features: ['Conceito Aberto', 'Balcão de Refeição', 'Integração']
    },
    {
        id: 7,
        category: 'COZINHA',
        title: 'Cozinha Gourmet',
        description: 'Preparada para experiências culinárias de alto nível.',
        fullDescription: 'Espaço equipado para chefs. Gavetas organizadoras de talheres, porta-temperos e lixeiras embutidas.',
        img: fotoCozinha7,
        features: ['Organizadores Internos', 'Cuba Dupla', 'Materiais Nobres']
    },

    // --- BANHEIROS ---
    {
        id: 8,
        category: 'BANHEIRO',
        title: 'Gabinete Suspenso',
        description: 'Leveza visual e facilidade na limpeza do piso.',
        fullDescription: 'Gabinete moderno fixado na parede, resistente à umidade, com gavetões para toalhas e itens de higiene.',
        img: fotoBanheiro1,
        features: ['Suspenso', 'Resistente à Água', 'Design Clean']
    },
    {
        id: 9,
        category: 'BANHEIRO',
        title: 'Armário com Espelheira',
        description: 'Conjunto completo para organização do seu banheiro.',
        fullDescription: 'Gabinete inferior espaçoso combinado com armário superior espelhado com iluminação LED para maquiagem.',
        img: fotoBanheiro2,
        features: ['Iluminação LED', 'Espelho Grande', 'Muitas Prateleiras']
    },

    // --- QUARTOS ---
    {
        id: 10,
        category: 'QUARTO',
        title: 'Closet Master',
        description: 'O sonho de organização para suas roupas e acessórios.',
        fullDescription: 'Closet aberto ou fechado, com sapateiras deslizantes, cabideiros iluminados e gavetas com divisórias para joias.',
        img: fotoQuarto1,
        features: ['Sob Medida', 'Iluminação Interna', 'Sapateira Deslizante']
    },
    {
        id: 11,
        category: 'QUARTO',
        title: 'Quarto Infantil Planejado',
        description: 'Segurança e diversão no ambiente das crianças.',
        fullDescription: 'Móveis com cantos arredondados, baús para brinquedos e escrivaninha ajustável para acompanhar o crescimento.',
        img: fotoQuarto2,
        features: ['Segurança', 'Cantos Arredondados', 'Multifuncional']
    },

    // --- SALAS ---
    {
        id: 12,
        category: 'SALA',
        title: 'Home Theater Ripado',
        description: 'O destaque da sua sala de estar.',
        fullDescription: 'Painel ripado em madeira nobre que vai do chão ao teto, escondendo todos os fios da TV e equipamentos.',
        img: fotoSala1,
        features: ['Painel Ripado', 'Fios Ocultos', 'Design Imponente']
    },
    {
        id: 13,
        category: 'SALA',
        title: 'Estante Decorativa',
        description: 'Exponha seus livros e decorações com elegância.',
        fullDescription: 'Estante vazada que pode servir como divisória de ambientes. Nichos iluminados para destacar objetos de arte.',
        img: fotoSala2,
        features: ['Nichos Iluminados', 'Divisória de Ambiente', 'Madeira Maciça']
    },
    {
        id: 14,
        category: 'SALA',
        title: 'Rack Suspenso Moderno',
        description: 'Design aéreo que amplia a sensação de espaço.',
        fullDescription: 'Rack com portas basculantes e acabamento em laca brilho ou fosca. Ideal para salas contemporâneas.',
        img: fotoSala3,
        features: ['Design Aéreo', 'Portas Basculantes', 'Visual Leve']
    },
    {
        id: 15,
        category: 'SALA',
        title: 'Aparador Buffet',
        description: 'Móvel versátil para sala de jantar ou estar.',
        fullDescription: 'Perfeito para guardar louças e servir de apoio em jantares. Tampo em vidro ou madeira maciça.',
        img: fotoSala4,
        features: ['Multiuso', 'Adega Integrada', 'Design Clássico']
    }
];