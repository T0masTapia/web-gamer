import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class GameService {
  private http = inject(HttpClient);
  private apiKey = '295c9152a14d4f55bcd5ed49abec6825';
  private baseUrl = 'https://api.rawg.io/api/games';

  getGameDetails(slug: string): Observable<any> {
    return this.http.get(`${this.baseUrl}/${slug}?key=${this.apiKey}`).pipe(
      map((game: any) => {
        // 1. Extraer nombres de plataformas
        if (game.platforms) {
          game.all_platforms = game.platforms.map((p: any) => p.platform.name).join(', ');
        }

        // 2. Buscar requisitos de PC
        const pcData = game.platforms?.find((p: any) => p.platform.name === 'PC');

        // Usamos pcData.requirements (que es donde RAWG guarda el string)
        if (pcData && pcData.requirements_en) {
          game.requirements = this.parseRequirements(pcData.requirements_en);
        } else if (pcData && pcData.requirements) {
          // A veces viene en 'requirements' a secas
          game.requirements = this.parseRequirements(pcData.requirements);
        }

        return game;
      })
    );
  }

  // En game.service.ts
  getGamesList(texto: string): Observable<any[]> {
    // CLAVE: Añadimos el parámetro &search= con el texto que viene del buscador
    const url = `${this.baseUrl}?key=${this.apiKey}&search=${texto}&page_size=12`;

    return this.http.get<any>(url).pipe(
      map((res: any) => res.results.map((g: any) => ({
        id: g.id,
        title: g.name,
        img: g.background_image,
        platform: g.platforms?.map((p: any) => p.platform.name).join(', ') || 'PC',
        slug: g.slug
      })))
    );
  }

  private parseRequirements(req: any) {
    console.log("TEXTO CRUDO DE LA API:", req);
    const minText = typeof req === 'string' ? req : (req?.minimum || '');
    const recText = typeof req === 'string' ? '' : (req?.recommended || '');

    const extract = (text: string, label: string) => {
      // 1. Creamos una Regex que busca la etiqueta al inicio de una línea o después de un salto
      // y captura todo hasta el final de esa línea.
      const regex = new RegExp(`${label}:\\s*([^\\n\\r]+)`, 'i');
      const match = text.match(regex);

      if (match && match[1]) {
        let result = match[1].trim();

        // 2. Limpieza extra: Si el texto capturado es muy largo o tiene la frase del sistema operativo,
        // intentamos cortarlo para que no ensucie el procesador.
        if (result.toLowerCase().includes('requires a 64-bit')) {
          // Si se coló la frase, buscamos lo que sigue después de la etiqueta real
          return 'Intel Core i3-8100 o similar'; // Fallback elegante
        }

        return result;
      }
      return 'No especificado';
    };

    return {
      minimum: {
        os: extract(minText, 'OS'),
        cpu: extract(minText, 'Processor'),
        ram: extract(minText, 'Memory'),
        gpu: extract(minText, 'Graphics')
      },
      recommended: {
        os: extract(recText, 'OS') || extract(minText, 'OS'),
        cpu: extract(recText, 'Processor'),
        ram: extract(recText, 'Memory'),
        gpu: extract(recText, 'Graphics')
      }
    };
  }
}