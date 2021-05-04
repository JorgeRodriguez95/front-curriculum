import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Persona } from 'src/app/models/persona';
import { PersonasService } from 'src/app/services/persona.service';

@Component({
  selector: 'app-curriculum',
  templateUrl: './curriculum.component.html',
  styleUrls: ['./curriculum.component.css']
})
export class CurriculumComponent implements OnInit {

  inputPersona: string;
  public persona: Persona = new Persona();

  constructor(private route: ActivatedRoute, private service: PersonasService, private router: Router) { }

  ngOnInit(): void {
    this.inputPersona = this.route.snapshot.paramMap.get('persona');
    this.service.findPersona(this.inputPersona).subscribe(response => {
      this.persona = response;
      console.log(this.persona);
    });
  }

}
