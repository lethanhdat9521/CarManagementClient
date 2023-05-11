import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ClientReceptsComponent } from './client-recepts.component';

describe('ClientReceptsComponent', () => {
  let component: ClientReceptsComponent;
  let fixture: ComponentFixture<ClientReceptsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ClientReceptsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ClientReceptsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
