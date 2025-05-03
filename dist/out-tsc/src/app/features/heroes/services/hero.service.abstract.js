export class HeroServiceAbstract {
    API_ENDPOINT = 'http://localhost:9000/heroes';
    defaultHero = {
        id: Math.floor(Math.random() * 10000) + 1000,
        name: 'Joker',
        image: "https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api/images/md/370-joker.jpg",
        alignment: 'bad',
        powerstats: {
            intelligence: 100,
            strength: 10,
            speed: 12,
            durability: 60,
            power: 43,
            combat: 70,
        },
    };
    NullHero = {
        id: Math.floor(Math.random() * 10000) + 1000,
        name: 'Not Found',
        image: './assets/img/hero-not-found.png',
        alignment: 'bad',
        powerstats: {
            intelligence: -1,
            strength: -1,
            speed: -1,
            durability: -1,
            power: -1,
            combat: -1,
        },
    };
    isDefaultHero(hero) {
        return hero.id === this.defaultHero.id;
    }
    isNullHero(hero) {
        return hero.id === this.NullHero.id;
    }
}
