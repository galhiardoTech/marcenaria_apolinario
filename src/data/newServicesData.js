import cozinhaAmadeirada from '../assets/img/servicos/cozinha/cozinha-amadeirada-bancada-central.webp';
import gabinetePrateleiras from '../assets/img/servicos/banheiro/gabinete-suspenso-prateleiras.webp';
import gabineteNichos from '../assets/img/servicos/banheiro/gabinete-nichos-iluminados.webp';
import gabinetePenteadeira from '../assets/img/servicos/banheiro/gabinete-penteadeira-espelheira.webp';
import closetVidro from '../assets/img/servicos/quarto/closet-vidro-espelho.webp';

export const newServicesData = [
    {
        id: 16,
        category: 'COZINHA',
        title: 'Cozinha Amadeirada com Bancada Central',
        description: 'Armários amadeirados, portas e gavetas em uma composição com bancada central e superfícies claras.',
        details: 'A marcenaria acompanha a bancada central e os demais espaços da cozinha, reunindo portas, gavetas e áreas de apoio. O acabamento amadeirado combina com as bancadas claras e mantém a continuidade visual do ambiente.',
        img: cozinhaAmadeirada,
        imageAlt: 'Cozinha amadeirada com bancada central clara, portas, gavetas e prateleiras de apoio.',
        imagePosition: 'center 64%',
        features: ['Bancada central', 'Portas e gavetas', 'Acabamento amadeirado'],
        video: '/videos/cozinha-planejada-detalhes.mp4',
        videoTitle: 'Cozinha planejada em vídeo',
    },
    {
        id: 17,
        category: 'BANHEIRO',
        title: 'Gabinete Suspenso com Prateleiras',
        description: 'Gabinete amadeirado e prateleiras abertas para aproveitar o espaço do banheiro com leveza.',
        details: 'O gabinete suspenso com duas portas organiza os itens de uso diário abaixo da bancada. As prateleiras abertas aproveitam a parede ao lado, criando espaço de apoio sem ocupar o piso.',
        img: gabinetePrateleiras,
        imageAlt: 'Gabinete suspenso de duas portas em acabamento amadeirado, com bancada clara e prateleiras abertas ao lado.',
        imagePosition: 'center 60%',
        features: ['Gabinete suspenso', 'Duas portas', 'Prateleiras abertas'],
    },
    {
        id: 18,
        category: 'BANHEIRO',
        title: 'Gabinete com Nichos Iluminados',
        description: 'Gabinete amadeirado, nichos iluminados e espelho em uma composição pensada para a organização diária.',
        details: 'A composição combina o gabinete inferior com nichos superiores iluminados e uma área espelhada. O nicho lateral aberto mantém itens de uso frequente ao alcance, aproveitando o espaço ao lado da bancada.',
        img: gabineteNichos,
        imageAlt: 'Gabinete de banheiro amadeirado com nicho lateral aberto, espelho e três nichos superiores iluminados.',
        imagePosition: 'center 52%',
        features: ['Nichos iluminados', 'Área espelhada', 'Nicho lateral aberto'],
    },
    {
        id: 19,
        category: 'BANHEIRO',
        title: 'Gabinete com Penteadeira e Espelheira',
        description: 'Gabinete com gavetas, apoio para penteadeira e espelheira ampla em uma composição amadeirada.',
        details: 'O conjunto reúne portas e gavetas sob a bancada, uma área lateral de penteadeira com espaço para assento e uma espelheira superior. O painel ripado e o acabamento amadeirado conectam os diferentes elementos do banheiro.',
        img: gabinetePenteadeira,
        imageAlt: 'Banheiro com gabinete amadeirado, gavetas, penteadeira lateral com assento, espelheira e painel ripado.',
        imagePosition: 'center 56%',
        features: ['Penteadeira integrada', 'Espelheira ampla', 'Painel ripado'],
    },
    {
        id: 20,
        category: 'QUARTO',
        title: 'Closet com Vidro e Espelho',
        description: 'Portas de vidro com perfis escuros e módulos espelhados em um closet de acabamento amadeirado.',
        details: 'O closet combina portas envidraçadas com perfis escuros e armários espelhados ao lado. A marcenaria ocupa a extensão da parede e mantém uma composição contínua com o acabamento amadeirado do ambiente.',
        img: closetVidro,
        imageAlt: 'Closet amadeirado com portas de vidro de perfis escuros e armário espelhado ao lado.',
        imagePosition: 'center 46%',
        features: ['Portas de vidro', 'Perfis escuros', 'Módulos espelhados'],
    },
];
