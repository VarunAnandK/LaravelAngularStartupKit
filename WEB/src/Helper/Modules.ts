import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { LabelModule } from "src/app/Shared/label/label.module";
import { ValidationMessageModule } from "src/app/Shared/validation-message/validation-message.module";

export const ModuleData = [
  FormsModule,
  ReactiveFormsModule.withConfig({ warnOnNgModelWithFormControl: 'never' }),
  LabelModule,
  ValidationMessageModule,
];
