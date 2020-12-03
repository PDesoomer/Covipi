import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
import { MarkerManager } from './marker-manager';
var InfoWindowManager = /** @class */ (function () {
    function InfoWindowManager(_mapsWrapper, _zone, _markerManager) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._markerManager = _markerManager;
        this._infoWindows = new Map();
    }
    InfoWindowManager.prototype.deleteInfoWindow = function (infoWindow) {
        var _this = this;
        var iWindow = this._infoWindows.get(infoWindow);
        if (iWindow == null) {
            // info window already deleted
            return Promise.resolve();
        }
        return iWindow.then(function (i) {
            return _this._zone.run(function () {
                i.close();
                _this._infoWindows.delete(infoWindow);
            });
        });
    };
    InfoWindowManager.prototype.setPosition = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setPosition({
            lat: infoWindow.latitude,
            lng: infoWindow.longitude,
        }); });
    };
    InfoWindowManager.prototype.setZIndex = function (infoWindow) {
        return this._infoWindows.get(infoWindow)
            .then(function (i) { return i.setZIndex(infoWindow.zIndex); });
    };
    InfoWindowManager.prototype.open = function (infoWindow) {
        var _this = this;
        return this._infoWindows.get(infoWindow).then(function (w) {
            if (infoWindow.hostMarker != null) {
                return _this._markerManager.getNativeMarker(infoWindow.hostMarker).then(function (marker) {
                    return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map, marker); });
                });
            }
            return _this._mapsWrapper.getNativeMap().then(function (map) { return w.open(map); });
        });
    };
    InfoWindowManager.prototype.close = function (infoWindow) {
        return this._infoWindows.get(infoWindow).then(function (w) { return w.close(); });
    };
    InfoWindowManager.prototype.setOptions = function (infoWindow, options) {
        return this._infoWindows.get(infoWindow).then(function (i) { return i.setOptions(options); });
    };
    InfoWindowManager.prototype.addInfoWindow = function (infoWindow) {
        var options = {
            content: infoWindow.content,
            maxWidth: infoWindow.maxWidth,
            zIndex: infoWindow.zIndex,
            disableAutoPan: infoWindow.disableAutoPan,
        };
        if (typeof infoWindow.latitude === 'number' && typeof infoWindow.longitude === 'number') {
            options.position = { lat: infoWindow.latitude, lng: infoWindow.longitude };
        }
        var infoWindowPromise = this._mapsWrapper.createInfoWindow(options);
        this._infoWindows.set(infoWindow, infoWindowPromise);
    };
    /**
     * Creates a Google Maps event listener for the given InfoWindow as an Observable
     */
    InfoWindowManager.prototype.createEventObservable = function (eventName, infoWindow) {
        var _this = this;
        return new Observable(function (observer) {
            _this._infoWindows.get(infoWindow).then(function (i) {
                i.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    InfoWindowManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone },
        { type: MarkerManager }
    ]; };
    InfoWindowManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone,
            MarkerManager])
    ], InfoWindowManager);
    return InfoWindowManager;
}());
export { InfoWindowManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3ctbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2luZm8td2luZG93LW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxNQUFNLGtCQUFrQixDQUFDO0FBR2pEO0lBSUUsMkJBQ1ksWUFBa0MsRUFBVSxLQUFhLEVBQ3pELGNBQTZCO1FBRDdCLGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFDekQsbUJBQWMsR0FBZCxjQUFjLENBQWU7UUFMakMsaUJBQVksR0FDaEIsSUFBSSxHQUFHLEVBQXNDLENBQUM7SUFJTixDQUFDO0lBRTdDLDRDQUFnQixHQUFoQixVQUFpQixVQUF5QjtRQUExQyxpQkFZQztRQVhDLElBQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2xELElBQUksT0FBTyxJQUFJLElBQUksRUFBRTtZQUNuQiw4QkFBOEI7WUFDOUIsT0FBTyxPQUFPLENBQUMsT0FBTyxFQUFFLENBQUM7U0FDMUI7UUFDRCxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFhO1lBQ2hDLE9BQU8sS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUM7Z0JBQ3BCLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztnQkFDVixLQUFJLENBQUMsWUFBWSxDQUFDLE1BQU0sQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FB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QUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsRUFBRSxpQkFBaUIsQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFQTs7T0FFRztJQUNKLGlEQUFxQixHQUFyQixVQUF5QixTQUFpQixFQUFFLFVBQXlCO1FBQXJFLGlCQU1DO1FBTEMsT0FBTyxJQUFJLFVBQVUsQ0FBQyxVQUFDLFFBQXFCO1lBQzFDLEtBQUksQ0FBQyxZQUFZLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFDLENBQWE7Z0JBQ25ELENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLFVBQUMsQ0FBSSxJQUFLLE9BQUEsS0FBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsY0FBTSxPQUFBLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLEVBQWhCLENBQWdCLENBQUMsRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDO1lBQzdFLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkF2RXlCLG9CQUFvQjtnQkFBaUIsTUFBTTtnQkFDekMsYUFBYTs7SUFOOUIsaUJBQWlCO1FBRDdCLFVBQVUsRUFBRTtpREFNZSxvQkFBb0IsRUFBaUIsTUFBTTtZQUN6QyxhQUFhO09BTjlCLGlCQUFpQixDQTZFN0I7SUFBRCx3QkFBQztDQUFBLEFBN0VELElBNkVDO1NBN0VZLGlCQUFpQiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWdtSW5mb1dpbmRvdyB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvaW5mby13aW5kb3cnO1xuXG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCB7IEluZm9XaW5kb3csIEluZm9XaW5kb3dPcHRpb25zIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuaW1wb3J0IHsgTWFya2VyTWFuYWdlciB9IGZyb20gJy4vbWFya2VyLW1hbmFnZXInO1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgSW5mb1dpbmRvd01hbmFnZXIge1xuICBwcml2YXRlIF9pbmZvV2luZG93czogTWFwPEFnbUluZm9XaW5kb3csIFByb21pc2U8SW5mb1dpbmRvdz4+ID1cbiAgICAgIG5ldyBNYXA8QWdtSW5mb1dpbmRvdywgUHJvbWlzZTxJbmZvV2luZG93Pj4oKTtcblxuICBjb25zdHJ1Y3RvcihcbiAgICAgIHByaXZhdGUgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lLFxuICAgICAgcHJpdmF0ZSBfbWFya2VyTWFuYWdlcjogTWFya2VyTWFuYWdlcikge31cblxuICBkZWxldGVJbmZvV2luZG93KGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBpV2luZG93ID0gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpO1xuICAgIGlmIChpV2luZG93ID09IG51bGwpIHtcbiAgICAgIC8vIGluZm8gd2luZG93IGFscmVhZHkgZGVsZXRlZFxuICAgICAgcmV0dXJuIFByb21pc2UucmVzb2x2ZSgpO1xuICAgIH1cbiAgICByZXR1cm4gaVdpbmRvdy50aGVuKChpOiBJbmZvV2luZG93KSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBpLmNsb3NlKCk7XG4gICAgICAgIHRoaXMuX2luZm9XaW5kb3dzLmRlbGV0ZShpbmZvV2luZG93KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgc2V0UG9zaXRpb24oaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigoaTogSW5mb1dpbmRvdykgPT4gaS5zZXRQb3NpdGlvbih7XG4gICAgICBsYXQ6IGluZm9XaW5kb3cubGF0aXR1ZGUsXG4gICAgICBsbmc6IGluZm9XaW5kb3cubG9uZ2l0dWRlLFxuICAgIH0pKTtcbiAgfVxuXG4gIHNldFpJbmRleChpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KVxuICAgICAgICAudGhlbigoaTogSW5mb1dpbmRvdykgPT4gaS5zZXRaSW5kZXgoaW5mb1dpbmRvdy56SW5kZXgpKTtcbiAgfVxuXG4gIG9wZW4oaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigodykgPT4ge1xuICAgICAgaWYgKGluZm9XaW5kb3cuaG9zdE1hcmtlciAhPSBudWxsKSB7XG4gICAgICAgIHJldHVybiB0aGlzLl9tYXJrZXJNYW5hZ2VyLmdldE5hdGl2ZU1hcmtlcihpbmZvV2luZG93Lmhvc3RNYXJrZXIpLnRoZW4oKG1hcmtlcikgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKChtYXApID0+IHcub3BlbihtYXAsIG1hcmtlcikpO1xuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICAgIHJldHVybiB0aGlzLl9tYXBzV3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKChtYXApID0+IHcub3BlbihtYXApKTtcbiAgICB9KTtcbiAgfVxuXG4gIGNsb3NlKGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3cpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5faW5mb1dpbmRvd3MuZ2V0KGluZm9XaW5kb3cpLnRoZW4oKHcpID0+IHcuY2xvc2UoKSk7XG4gIH1cblxuICBzZXRPcHRpb25zKGluZm9XaW5kb3c6IEFnbUluZm9XaW5kb3csIG9wdGlvbnM6IEluZm9XaW5kb3dPcHRpb25zKSB7XG4gICAgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dzLmdldChpbmZvV2luZG93KS50aGVuKChpOiBJbmZvV2luZG93KSA9PiBpLnNldE9wdGlvbnMob3B0aW9ucykpO1xuICB9XG5cbiAgYWRkSW5mb1dpbmRvdyhpbmZvV2luZG93OiBBZ21JbmZvV2luZG93KSB7XG4gICAgY29uc3Qgb3B0aW9uczogSW5mb1dpbmRvd09wdGlvbnMgPSB7XG4gICAgICBjb250ZW50OiBpbmZvV2luZG93LmNvbnRlbnQsXG4gICAgICBtYXhXaWR0aDogaW5mb1dpbmRvdy5tYXhXaWR0aCxcbiAgICAgIHpJbmRleDogaW5mb1dpbmRvdy56SW5kZXgsXG4gICAgICBkaXNhYmxlQXV0b1BhbjogaW5mb1dpbmRvdy5kaXNhYmxlQXV0b1BhbixcbiAgICB9O1xuICAgIGlmICh0eXBlb2YgaW5mb1dpbmRvdy5sYXRpdHVkZSA9PT0gJ251bWJlcicgJiYgdHlwZW9mIGluZm9XaW5kb3cubG9uZ2l0dWRlID09PSAnbnVtYmVyJykge1xuICAgICAgb3B0aW9ucy5wb3NpdGlvbiA9IHtsYXQ6IGluZm9XaW5kb3cubGF0aXR1ZGUsIGxuZzogaW5mb1dpbmRvdy5sb25naXR1ZGV9O1xuICAgIH1cbiAgICBjb25zdCBpbmZvV2luZG93UHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZUluZm9XaW5kb3cob3B0aW9ucyk7XG4gICAgdGhpcy5faW5mb1dpbmRvd3Muc2V0KGluZm9XaW5kb3csIGluZm9XaW5kb3dQcm9taXNlKTtcbiAgfVxuXG4gICAvKipcbiAgICAqIENyZWF0ZXMgYSBHb29nbGUgTWFwcyBldmVudCBsaXN0ZW5lciBmb3IgdGhlIGdpdmVuIEluZm9XaW5kb3cgYXMgYW4gT2JzZXJ2YWJsZVxuICAgICovXG4gIGNyZWF0ZUV2ZW50T2JzZXJ2YWJsZTxUPihldmVudE5hbWU6IHN0cmluZywgaW5mb1dpbmRvdzogQWdtSW5mb1dpbmRvdyk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICB0aGlzLl9pbmZvV2luZG93cy5nZXQoaW5mb1dpbmRvdykudGhlbigoaTogSW5mb1dpbmRvdykgPT4ge1xuICAgICAgICBpLmFkZExpc3RlbmVyKGV2ZW50TmFtZSwgKGU6IFQpID0+IHRoaXMuX3pvbmUucnVuKCgpID0+IG9ic2VydmVyLm5leHQoZSkpKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG59XG4iXX0=