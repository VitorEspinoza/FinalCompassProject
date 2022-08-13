import { ElementRef } from '@angular/core';
import { FormGroup } from '@angular/forms';

import { Observable, fromEvent, merge } from 'rxjs';

import { GenericValidator, DisplayMessage, ValidationMessages } from '../utilities/generic-form-validation';

export abstract class FormBaseComponent {

    displayMessage: DisplayMessage = {};
    genericValidator!: GenericValidator;
    validationMessages!: ValidationMessages;

    mudancasNaoSalvas!: boolean;

    public configureMessagesBaseValidation(validationMessages: ValidationMessages) {
        this.genericValidator = new GenericValidator(validationMessages);
    }

    public configureFormBaseValidation(
        formInputElements: ElementRef[],
        formGroup: FormGroup) {

        let controlBlurs: Observable<any>[] = formInputElements
            .map((formControl: ElementRef) => fromEvent(formControl.nativeElement, 'blur'));

        merge(...controlBlurs).subscribe(() => {
            this.validateForm(formGroup)
        });
    }

    public validateForm(formGroup: FormGroup) {
        this.displayMessage = this.genericValidator.processMessages(formGroup);
        this.mudancasNaoSalvas = true;
    }
}
