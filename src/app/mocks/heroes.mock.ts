import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HeroesApi } from '../api/heroes.api';
import { Hero } from '../models/hero.model';

@Injectable()
export class HeroesMock extends HeroesApi {
  override getHeroes(): Observable<Hero[]> {
    return of(this.startingHeroes);
  }

  startingHeroes: Hero[] = [
    {
      id: 1,
      name: 'Spider-Man',
      franchise: 'Marvel',
      description: 'A young hero with spider-like abilities.',
    },
    {
      id: 2,
      name: 'Iron Man',
      franchise: 'Marvel',
      description: 'A genius billionaire using a powered armor suit.',
    },
    {
      id: 3,
      name: 'Captain America',
      franchise: 'Marvel',
      description: 'A super soldier enhanced during World War II.',
    },
    {
      id: 4,
      name: 'Thor',
      franchise: 'Marvel',
      description: 'The Norse god of thunder wielding Mjolnir.',
    },
    {
      id: 5,
      name: 'Hulk',
      franchise: 'Marvel',
      description: 'A scientist who transforms into a powerful green monster.',
    },
    {
      id: 6,
      name: 'Black Widow',
      franchise: 'Marvel',
      description: 'A highly trained spy and combat expert.',
    },
    {
      id: 7,
      name: 'Doctor Strange',
      franchise: 'Marvel',
      description: 'A master of the mystic arts.',
    },
    {
      id: 8,
      name: 'Black Panther',
      franchise: 'Marvel',
      description: 'The king and protector of Wakanda.',
    },
    {
      id: 9,
      name: 'Ant-Man',
      franchise: 'Marvel',
      description: 'A hero who can shrink and control ants.',
    },
    {
      id: 10,
      name: 'Wolverine',
      franchise: 'Marvel',
      description: 'A mutant with regenerative powers and adamantium claws.',
    },

    {
      id: 11,
      name: 'Batman',
      franchise: 'DC',
      description: 'A vigilante using intelligence, technology, and fear.',
    },
    {
      id: 12,
      name: 'Superman',
      franchise: 'DC',
      description: 'An alien with extraordinary powers raised on Earth.',
    },
    {
      id: 13,
      name: 'Wonder Woman',
      franchise: 'DC',
      description: 'An Amazonian warrior with divine abilities.',
    },
    { id: 14, name: 'Flash', franchise: 'DC', description: 'A hero with superhuman speed.' },
    {
      id: 15,
      name: 'Aquaman',
      franchise: 'DC',
      description: 'The ruler of Atlantis with control over the seas.',
    },
    {
      id: 16,
      name: 'Green Lantern',
      franchise: 'DC',
      description: 'A space cop powered by a will-based ring.',
    },
    {
      id: 17,
      name: 'Cyborg',
      franchise: 'DC',
      description: 'A human enhanced with advanced cybernetics.',
    },
    {
      id: 18,
      name: 'Shazam',
      franchise: 'DC',
      description: 'A boy who transforms into a powerful adult hero.',
    },
    {
      id: 19,
      name: 'Nightwing',
      franchise: 'DC',
      description: 'A former sidekick turned independent hero.',
    },
    {
      id: 20,
      name: 'Batgirl',
      franchise: 'DC',
      description: 'A skilled crime fighter inspired by Batman.',
    },

    {
      id: 21,
      name: 'Hellboy',
      franchise: 'Other',
      description: 'A demon summoned to Earth who fights evil.',
    },
    {
      id: 22,
      name: 'Spawn',
      franchise: 'Other',
      description: 'A resurrected soldier with dark supernatural powers.',
    },
    {
      id: 23,
      name: 'The Mask',
      franchise: 'Other',
      description: 'A man transformed by a mystical mask.',
    },
    {
      id: 24,
      name: 'Judge Dredd',
      franchise: 'Other',
      description: 'A law enforcer who is judge, jury, and executioner.',
    },
    {
      id: 25,
      name: 'Invincible',
      franchise: 'Other',
      description: 'A young hero discovering his alien heritage.',
    },
    {
      id: 26,
      name: 'Blade',
      franchise: 'Other',
      description: 'Half-vampire hero who hunts supernatural threats.',
    },
    {
      id: 27,
      name: 'Hancock',
      franchise: 'Other',
      description: 'A reluctant hero with incredible strength.',
    },
    {
      id: 28,
      name: 'Mega Man',
      franchise: 'Other',
      description: 'A robot hero created to fight evil robots.',
    },
    {
      id: 29,
      name: 'Astro Boy',
      franchise: 'Other',
      description: 'A powerful robot boy with a human heart.',
    },
    {
      id: 30,
      name: 'The Crow',
      franchise: 'Other',
      description: 'A resurrected man seeking justice.',
    },
  ];
}
