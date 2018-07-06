import { Injectable } from "@angular/core";
import { HttpInterceptor, HttpHandler, HttpEvent, HttpRequest } from "@angular/common/http";
import { Observable } from "rxjs";

@Injectable()
export class ProgressIntereceptor implements HttpInterceptor {

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        console.log('intercepted', request.url)

        //TODO do not change this here if the purpose of this
        //interceptor is to show the progress. Move this if you really need to do this
        //when you do this you are sending an additional OPTIONS Request
        //QUESTION: Is this duplicate the request? 
        //https://stackoverflow.com/questions/36353532/angular2-options-method-sent-when-asking-for-http-get
        //is has something to do with the content-type.
        //You might have to configure asp.net server to fix this issue
        // const requestModified = request.clone({
        //     setHeaders: { 'Content-Type': 'application/json' }
        // });
        // return next.handle(requestModified)

        return next.handle(request);
    }
}