import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UserLoginPage } from './user-login.page';

describe('UserLoginPage', () => {
  let component: UserLoginPage;
  let fixture: ComponentFixture<UserLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UserLoginPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
