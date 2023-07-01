import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SinMaquinasPage } from './sin-maquinas.page';

describe('SinMaquinasPage', () => {
  let component: SinMaquinasPage;
  let fixture: ComponentFixture<SinMaquinasPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SinMaquinasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
