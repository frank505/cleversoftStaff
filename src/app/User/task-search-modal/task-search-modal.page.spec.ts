import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskSearchModalPage } from './task-search-modal.page';

describe('TaskSearchModalPage', () => {
  let component: TaskSearchModalPage;
  let fixture: ComponentFixture<TaskSearchModalPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TaskSearchModalPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TaskSearchModalPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
