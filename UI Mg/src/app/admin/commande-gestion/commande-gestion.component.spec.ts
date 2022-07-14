import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommandeGestionComponent } from './commande-gestion.component';

describe('CommandeGestionComponent', () => {
  let component: CommandeGestionComponent;
  let fixture: ComponentFixture<CommandeGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommandeGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CommandeGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
