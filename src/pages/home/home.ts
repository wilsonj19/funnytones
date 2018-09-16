import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SONIDOSLIST }  from "../../data/data.animales";
import { timbres }  from "../../interfaces/sonidos.interface";
import { Refresher } from 'ionic-angular';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  sonidos:timbres[] = [];
  audio = new Audio();
  audioTiempo:any;

  constructor() {
    this.sonidos = SONIDOSLIST.slice(0);
  }

  reproducir( sonido:timbres ){

     this.pausar_audio( sonido );
     if( sonido.reproduciendo ){
        sonido.reproduciendo = false;
        return;
     }
     this.audio.src = sonido.audio;
     this.audio.load();
     this.audio.play();
     sonido.reproduciendo = true;
     this.audioTiempo = setTimeout( ()=> sonido.reproduciendo = false, sonido.duracion * 100 );

  }

  private pausar_audio( sonidoSel:timbres  ){
     clearTimeout( this.audioTiempo );
     this.audio.pause();
     this.audio.currentTime = 0;

     for( let sonido of this.sonidos ){
         if( sonido.nombre != sonidoSel.nombre ){
           sonido.reproduciendo = false;
         }
     }

  }

  borrar_animal( idx:number ){
     this.sonidos.splice( idx, 1 )
  }

  actualizando_sonidos( refresher:Refresher  ){

     console.log('Sonidos actualizados');
     setTimeout( () => {
      console.log('Termino de actualizar');
      this.sonidos = SONIDOSLIST.slice(0);
      refresher.complete();
    }, 2000)

  }

}
