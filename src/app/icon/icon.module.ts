import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FeatherModule } from 'angular-feather';
import { Camera, Heart, Github, Moon, Edit2, Trash2, 	Trash, PhoneOff, Tv, MousePointer, Type } from 'angular-feather/icons';

const icons = {
  Camera,
  Heart,
  Github,
  Moon,
  Edit2,
  Trash2,
  Trash,
  PhoneOff,
  Tv,
  MousePointer,
  Type
};

@NgModule({
  imports: [
    FeatherModule.pick(icons)
  ],
  exports: [
    FeatherModule
  ]
})
export class IconModule { }
