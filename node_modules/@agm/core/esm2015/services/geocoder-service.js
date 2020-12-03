import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { bindCallback, Observable, of, ReplaySubject, throwError } from 'rxjs';
import { map, multicast, switchMap } from 'rxjs/operators';
import { GeocoderStatus } from './google-maps-types';
import { MapsAPILoader } from './maps-api-loader/maps-api-loader';
import * as i0 from "@angular/core";
import * as i1 from "./maps-api-loader/maps-api-loader";
let AgmGeocoder = class AgmGeocoder {
    constructor(loader) {
        const connectableGeocoder$ = new Observable(subscriber => {
            loader.load().then(() => subscriber.next());
        })
            .pipe(map(() => this._createGeocoder()), multicast(new ReplaySubject(1)));
        connectableGeocoder$.connect(); // ignore the subscription
        // since we will remain subscribed till application exits
        this.geocoder$ = connectableGeocoder$;
    }
    geocode(request) {
        return this.geocoder$.pipe(switchMap((geocoder) => this._getGoogleResults(geocoder, request)));
    }
    _getGoogleResults(geocoder, request) {
        const geocodeObservable = bindCallback(geocoder.geocode);
        return geocodeObservable(request).pipe(switchMap(([results, status]) => {
            if (status === GeocoderStatus.OK) {
                return of(results);
            }
            return throwError(status);
        }));
    }
    _createGeocoder() {
        return new google.maps.Geocoder();
    }
};
AgmGeocoder.ctorParameters = () => [
    { type: MapsAPILoader }
];
AgmGeocoder.ngInjectableDef = i0.ɵɵdefineInjectable({ factory: function AgmGeocoder_Factory() { return new AgmGeocoder(i0.ɵɵinject(i1.MapsAPILoader)); }, token: AgmGeocoder, providedIn: "root" });
AgmGeocoder = tslib_1.__decorate([
    Injectable({ providedIn: 'root' }),
    tslib_1.__metadata("design:paramtypes", [MapsAPILoader])
], AgmGeocoder);
export { AgmGeocoder };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2VvY29kZXItc2VydmljZS5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL2dlb2NvZGVyLXNlcnZpY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxFQUFFLFlBQVksRUFBeUIsVUFBVSxFQUFFLEVBQUUsRUFBRSxhQUFhLEVBQUUsVUFBVSxFQUFFLE1BQU0sTUFBTSxDQUFDO0FBQ3RHLE9BQU8sRUFBRSxHQUFHLEVBQUUsU0FBUyxFQUFFLFNBQVMsRUFBRSxNQUFNLGdCQUFnQixDQUFDO0FBQzNELE9BQU8sRUFBNkMsY0FBYyxFQUFFLE1BQU0scUJBQXFCLENBQUM7QUFDaEcsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLG1DQUFtQyxDQUFDOzs7QUFLbEUsSUFBYSxXQUFXLEdBQXhCLE1BQWEsV0FBVztJQUd0QixZQUFZLE1BQXFCO1FBQy9CLE1BQU0sb0JBQW9CLEdBQUcsSUFBSSxVQUFVLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdkQsTUFBTSxDQUFDLElBQUksRUFBRSxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQztRQUM5QyxDQUFDLENBQUM7YUFDQyxJQUFJLENBQ0gsR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQyxFQUNqQyxTQUFTLENBQUMsSUFBSSxhQUFhLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FDRyxDQUFDO1FBRXZDLG9CQUFvQixDQUFDLE9BQU8sRUFBRSxDQUFDLENBQUMsMEJBQTBCO1FBQzFELHlEQUF5RDtRQUV6RCxJQUFJLENBQUMsU0FBUyxHQUFHLG9CQUFvQixDQUFDO0lBQ3hDLENBQUM7SUFFRCxPQUFPLENBQUMsT0FBd0I7UUFDOUIsT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FDeEIsU0FBUyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUUsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsUUFBUSxFQUFFLE9BQU8sQ0FBQyxDQUFDLENBQ25FLENBQUM7SUFDSixDQUFDO0lBRU8saUJBQWlCLENBQUMsUUFBa0IsRUFBRSxPQUF3QjtRQUNwRSxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDekQsT0FBTyxpQkFBaUIsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQ3BDLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxFQUFFLEVBQUU7WUFDOUIsSUFBSSxNQUFNLEtBQUssY0FBYyxDQUFDLEVBQUUsRUFBRTtnQkFDaEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDLENBQUM7YUFDcEI7WUFFRCxPQUFPLFVBQVUsQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUMsQ0FDSCxDQUFDO0lBQ0osQ0FBQztJQUVPLGVBQWU7UUFDckIsT0FBTyxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxFQUFjLENBQUM7SUFDaEQsQ0FBQztDQUNGLENBQUE7O1lBckNxQixhQUFhOzs7QUFIdEIsV0FBVztJQUR2QixVQUFVLENBQUMsRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLENBQUM7NkNBSWIsYUFBYTtHQUh0QixXQUFXLENBd0N2QjtTQXhDWSxXQUFXIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgYmluZENhbGxiYWNrLCBDb25uZWN0YWJsZU9ic2VydmFibGUsIE9ic2VydmFibGUsIG9mLCBSZXBsYXlTdWJqZWN0LCB0aHJvd0Vycm9yIH0gZnJvbSAncnhqcyc7XG5pbXBvcnQgeyBtYXAsIG11bHRpY2FzdCwgc3dpdGNoTWFwIH0gZnJvbSAncnhqcy9vcGVyYXRvcnMnO1xuaW1wb3J0IHsgR2VvY29kZXIsIEdlb2NvZGVyUmVxdWVzdCwgR2VvY29kZXJSZXN1bHQsIEdlb2NvZGVyU3RhdHVzIH0gZnJvbSAnLi9nb29nbGUtbWFwcy10eXBlcyc7XG5pbXBvcnQgeyBNYXBzQVBJTG9hZGVyIH0gZnJvbSAnLi9tYXBzLWFwaS1sb2FkZXIvbWFwcy1hcGktbG9hZGVyJztcblxuZGVjbGFyZSB2YXIgZ29vZ2xlOiBhbnk7XG5cbkBJbmplY3RhYmxlKHsgcHJvdmlkZWRJbjogJ3Jvb3QnIH0pXG5leHBvcnQgY2xhc3MgQWdtR2VvY29kZXIge1xuICBwcm90ZWN0ZWQgcmVhZG9ubHkgZ2VvY29kZXIkOiBPYnNlcnZhYmxlPEdlb2NvZGVyPjtcblxuICBjb25zdHJ1Y3Rvcihsb2FkZXI6IE1hcHNBUElMb2FkZXIpIHtcbiAgICBjb25zdCBjb25uZWN0YWJsZUdlb2NvZGVyJCA9IG5ldyBPYnNlcnZhYmxlKHN1YnNjcmliZXIgPT4ge1xuICAgICAgbG9hZGVyLmxvYWQoKS50aGVuKCgpID0+IHN1YnNjcmliZXIubmV4dCgpKTtcbiAgICB9KVxuICAgICAgLnBpcGUoXG4gICAgICAgIG1hcCgoKSA9PiB0aGlzLl9jcmVhdGVHZW9jb2RlcigpKSxcbiAgICAgICAgbXVsdGljYXN0KG5ldyBSZXBsYXlTdWJqZWN0KDEpKSxcbiAgICAgICkgYXMgQ29ubmVjdGFibGVPYnNlcnZhYmxlPEdlb2NvZGVyPjtcblxuICAgIGNvbm5lY3RhYmxlR2VvY29kZXIkLmNvbm5lY3QoKTsgLy8gaWdub3JlIHRoZSBzdWJzY3JpcHRpb25cbiAgICAvLyBzaW5jZSB3ZSB3aWxsIHJlbWFpbiBzdWJzY3JpYmVkIHRpbGwgYXBwbGljYXRpb24gZXhpdHNcblxuICAgIHRoaXMuZ2VvY29kZXIkID0gY29ubmVjdGFibGVHZW9jb2RlciQ7XG4gIH1cblxuICBnZW9jb2RlKHJlcXVlc3Q6IEdlb2NvZGVyUmVxdWVzdCk6IE9ic2VydmFibGU8R2VvY29kZXJSZXN1bHRbXT4ge1xuICAgIHJldHVybiB0aGlzLmdlb2NvZGVyJC5waXBlKFxuICAgICAgc3dpdGNoTWFwKChnZW9jb2RlcikgPT4gdGhpcy5fZ2V0R29vZ2xlUmVzdWx0cyhnZW9jb2RlciwgcmVxdWVzdCkpXG4gICAgKTtcbiAgfVxuXG4gIHByaXZhdGUgX2dldEdvb2dsZVJlc3VsdHMoZ2VvY29kZXI6IEdlb2NvZGVyLCByZXF1ZXN0OiBHZW9jb2RlclJlcXVlc3QpOiBPYnNlcnZhYmxlPEdlb2NvZGVyUmVzdWx0W10+IHtcbiAgICBjb25zdCBnZW9jb2RlT2JzZXJ2YWJsZSA9IGJpbmRDYWxsYmFjayhnZW9jb2Rlci5nZW9jb2RlKTtcbiAgICByZXR1cm4gZ2VvY29kZU9ic2VydmFibGUocmVxdWVzdCkucGlwZShcbiAgICAgIHN3aXRjaE1hcCgoW3Jlc3VsdHMsIHN0YXR1c10pID0+IHtcbiAgICAgICAgaWYgKHN0YXR1cyA9PT0gR2VvY29kZXJTdGF0dXMuT0spIHtcbiAgICAgICAgICByZXR1cm4gb2YocmVzdWx0cyk7XG4gICAgICAgIH1cblxuICAgICAgICByZXR1cm4gdGhyb3dFcnJvcihzdGF0dXMpO1xuICAgICAgfSlcbiAgICApO1xuICB9XG5cbiAgcHJpdmF0ZSBfY3JlYXRlR2VvY29kZXIoKTogR2VvY29kZXIge1xuICAgIHJldHVybiBuZXcgZ29vZ2xlLm1hcHMuR2VvY29kZXIoKSBhcyBHZW9jb2RlcjtcbiAgfVxufVxuIl19