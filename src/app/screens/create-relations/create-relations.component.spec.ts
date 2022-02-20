import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateRelationsComponent } from './create-relations.component';

describe('CreateRelationsComponent', () => {
  let component: CreateRelationsComponent;
  let fixture: ComponentFixture<CreateRelationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateRelationsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateRelationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
