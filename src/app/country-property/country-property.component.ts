import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-country-property',
  templateUrl: './country-property.component.html',
  styleUrls: ['./country-property.component.scss'],
  standalone: true,
})
export class CountryPropertyComponent {
  @Input() property = '';
  @Input() value = '';
}
