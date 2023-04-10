import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { switchMap, tap } from 'rxjs';

import { PaisService } from '../../services/pais.service';
import { Country } from '../../interfaces/pais.interface';

@Component({
  selector: 'app-ver-pais',
  templateUrl: './ver-pais.component.html',
  styles: [
  ]
})
export class VerPaisComponent implements OnInit {

  pais!: Country;  //El signo de admiración al final de una variable significa q puede ser null

  constructor(
    private activatedRoute: ActivatedRoute,
    private paisService: PaisService
    ) {}

  ngOnInit(): void {

    this.activatedRoute.params
      .pipe(
        switchMap(({id}) => this.paisService.getPaisPorAlpha(id)),    //switchMap recibe un observable y regresa otro observable
        tap( console.log )                                            //tap permite efectuar una funcion y le pasa el valor
      )
      .subscribe( ([pais]) => this.pais = pais )

    //--Es el mismo codigo anterior
    // this.activatedRoute.params
    //   .subscribe( ({ id }) => {
    //     console.log(id);

    //     this.paisService.getPaisPorAlpha( id )
    //       .subscribe( ([pais]) => {
    //         console.log( pais.capital );
    //       })
    //   })
  }
}
