import {
    Directive, ElementRef, OnInit,
    Input, ChangeDetectorRef, Output, EventEmitter,
    HostListener
} from '@angular/core';
import { validateConfig } from '@angular/router/src/config';
import { checkAndUpdateDirectiveInline } from '@angular/core/src/view/provider';
import { ControlValueAccessor } from '@angular/forms';

@Directive({
    // tslint:disable-next-line:directive-selector
    selector: '[numeric-input]'
})
export class NumericInputDirective implements OnInit {
    @Output() ngModelChange: EventEmitter<any> = new EventEmitter(false);

    @Input() min = 0;
    @Input() max: number;
    @Input() decimals: number;
    keyDownValue = '';

    constructor(private el: ElementRef, private change: ChangeDetectorRef) { }

    ngOnInit(): void {

        if (isNaN(this.decimals)) {
            this.decimals = 0;
        } else {
            this.decimals = Math.abs(Math.floor(this.decimals));
        }
    }

    @HostListener('paste', ['$event'])
    paste = (event: Event): void => {

        event.preventDefault();
    }

    @HostListener('keydown', ['$event'])
    keyDown = (event: KeyboardEvent): void => {

        //Prevent the arrow down or up from changing the numeric input type from 
        //changing the numer
        if (event.keyCode === 40 || event.keyCode === 38) {
            event.preventDefault();
            return;
        }

        const input = <HTMLInputElement>this.el.nativeElement;
        this.keyDownValue = this.el.nativeElement.value;
    }

    @HostListener('keyup', ['$event'])
    keyUp = (event: KeyboardEvent): void => {

        const inputValue = this.el.nativeElement.value;

        if (!isNaN(this.max)) {
            if (!isNaN(inputValue)) {
                const num = Number(inputValue);

                if (num > this.max) {
                    this.el.nativeElement.value = this.keyDownValue;
                    this.ngModelChange.emit(this.el.nativeElement.value);
                }
            }
        }

        //Dont allow negative but in first position
        if (inputValue.indexOf('-') > 0) {
            this.el.nativeElement.value = this.keyDownValue;
        }

        //Don't allow there to be more decmials than allowed
        //Why do you not like this?
        //because it forces cursor to be at the end of the value
        //it jumps the curor around
        //TODO can you fix the above issues?
        const decimalIndex = this.el.nativeElement.value.indexOf('.');
        if (decimalIndex >= 0) {
            const diff = this.el.nativeElement.value.length - decimalIndex;
            if (diff > this.decimals + 1) {
                // console.log('prevented');
                this.el.nativeElement.value = this.keyDownValue;
            }
        }

    }

    //TODO move this to a serive
    checkNumericKey = (allowNegative: boolean, allowDecimalPrecision: boolean, character: string): boolean => {

        if (!allowNegative && allowDecimalPrecision) {
            return /[0-9\.\ ]/.test(character);
        }

        if (allowNegative && allowDecimalPrecision) {
            return /[0-9\.\-\ ]/.test(character);
        }

        return /[0-9]/.test(character);
    }

    @HostListener('keypress', ['$event'])
    checkInput = (event: KeyboardEvent): void => {

        const value: string = this.el.nativeElement.value;
        const inputChar = String.fromCharCode(event.charCode);

        //Do not allow characters that don't represnt numbers
        //Can this logic be only calculated one and made testable
        const allowNegative = this.min < -0;
        const allowDecimalPrecision = this.decimals > 0;
        if (!this.checkNumericKey(allowNegative, allowDecimalPrecision, inputChar)) {
            event.preventDefault();
            return;
        }

        //don't allow multiple decimals
        if (value.indexOf('.') >= 0 && event.key === '.') {
            event.preventDefault();
            return;
        }

        //don't allow multiple negative sigh
        if (value.indexOf('-') >= 0 && event.key === '-') {
            event.preventDefault();
            return;
        }
    }

    //TODO this might not be needed and/or could be in a servide
    getPattern = (allowNegative: boolean, allowDecimalPrecision: boolean): RegExp => {

        if (!allowDecimalPrecision && !allowNegative) {
            return new RegExp(/[0-9\ ]/);
        }

        if (allowNegative && allowDecimalPrecision) {
            return new RegExp(/^-?[0-9]?\d*(\.\d+)?$/);
        }

        return new RegExp(/[0-9\.\ ]/);
    }
}