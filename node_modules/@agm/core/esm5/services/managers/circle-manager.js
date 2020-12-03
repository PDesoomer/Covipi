import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var CircleManager = /** @class */ (function () {
    function CircleManager(_apiWrapper, _zone) {
        this._apiWrapper = _apiWrapper;
        this._zone = _zone;
        this._circles = new Map();
    }
    CircleManager.prototype.addCircle = function (circle) {
        this._circles.set(circle, this._apiWrapper.createCircle({
            center: { lat: circle.latitude, lng: circle.longitude },
            clickable: circle.clickable,
            draggable: circle.draggable,
            editable: circle.editable,
            fillColor: circle.fillColor,
            fillOpacity: circle.fillOpacity,
            radius: circle.radius,
            strokeColor: circle.strokeColor,
            strokeOpacity: circle.strokeOpacity,
            strokePosition: circle.strokePosition,
            strokeWeight: circle.strokeWeight,
            visible: circle.visible,
            zIndex: circle.zIndex,
        }));
    };
    /**
     * Removes the given circle from the map.
     */
    CircleManager.prototype.removeCircle = function (circle) {
        var _this = this;
        return this._circles.get(circle).then(function (c) {
            c.setMap(null);
            _this._circles.delete(circle);
        });
    };
    CircleManager.prototype.setOptions = function (circle, options) {
        return this._circles.get(circle).then(function (c) {
            if (typeof options.strokePosition === 'string') {
                options.strokePosition = google.maps.StrokePosition[options.strokePosition];
            }
            c.setOptions(options);
        });
    };
    CircleManager.prototype.getBounds = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getBounds(); });
    };
    CircleManager.prototype.getCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getCenter(); });
    };
    CircleManager.prototype.getRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.getRadius(); });
    };
    CircleManager.prototype.setCenter = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setCenter({ lat: circle.latitude, lng: circle.longitude }); });
    };
    CircleManager.prototype.setEditable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setEditable(circle.editable); });
    };
    CircleManager.prototype.setDraggable = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setDraggable(circle.draggable); });
    };
    CircleManager.prototype.setVisible = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setVisible(circle.visible); });
    };
    CircleManager.prototype.setRadius = function (circle) {
        return this._circles.get(circle).then(function (c) { return c.setRadius(circle.radius); });
    };
    CircleManager.prototype.getNativeCircle = function (circle) {
        return this._circles.get(circle);
    };
    CircleManager.prototype.createEventObservable = function (eventName, circle) {
        var _this = this;
        return new Observable(function (observer) {
            var listener = null;
            _this._circles.get(circle).then(function (c) {
                listener = c.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
            return function () {
                if (listener !== null) {
                    listener.remove();
                }
            };
        });
    };
    CircleManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    CircleManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], CircleManager);
    return CircleManager;
}());
export { CircleManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2lyY2xlLW1hbmFnZXIuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJzZXJ2aWNlcy9tYW5hZ2Vycy9jaXJjbGUtbWFuYWdlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0FBQUEsT0FBTyxFQUFFLFVBQVUsRUFBRSxNQUFNLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFbkQsT0FBTyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUc1QyxPQUFPLEVBQUUsb0JBQW9CLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQU1sRTtJQUlFLHVCQUFvQixXQUFpQyxFQUFVLEtBQWE7UUFBeEQsZ0JBQVcsR0FBWCxXQUFXLENBQXNCO1FBQVUsVUFBSyxHQUFMLEtBQUssQ0FBUTtRQUhwRSxhQUFRLEdBQ1osSUFBSSxHQUFHLEVBQXVDLENBQUM7SUFFNEIsQ0FBQztJQUVoRixpQ0FBUyxHQUFULFVBQVUsTUFBaUI7UUFDekIsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDO1lBQ3RELE1BQU0sRUFBRSxFQUFDLEdBQUcsRUFBRSxNQUFNLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsU0FBUyxFQUFDO1lBQ3JELFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixTQUFTLEVBQUUsTUFBTSxDQUFDLFNBQVM7WUFDM0IsUUFBUSxFQUFFLE1BQU0sQ0FBQyxRQUFRO1lBQ3pCLFNBQVMsRUFBRSxNQUFNLENBQUMsU0FBUztZQUMzQixXQUFXLEVBQUUsTUFBTSxDQUFDLFdBQVc7WUFDL0IsTUFBTSxFQUFFLE1BQU0sQ0FBQyxNQUFNO1lBQ3JCLFdBQVcsRUFBRSxNQUFNLENBQUMsV0FBVztZQUMvQixhQUFhLEVBQUUsTUFBTSxDQUFDLGFBQWE7WUFDbkMsY0FBYyxFQUFFLE1BQU0sQ0FBQyxjQUFjO1lBQ3JDLFlBQVksRUFBRSxNQUFN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TUFBTSxFQUFFLENBQUM7aUJBQ25CO1lBQ0gsQ0FBQyxDQUFDO1FBQ0osQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDOztnQkF6RmdDLG9CQUFvQjtnQkFBaUIsTUFBTTs7SUFKakUsYUFBYTtRQUR6QixVQUFVLEVBQUU7aURBS3NCLG9CQUFvQixFQUFpQixNQUFNO09BSmpFLGFBQWEsQ0E4RnpCO0lBQUQsb0JBQUM7Q0FBQSxBQTlGRCxJQThGQztTQTlGWSxhQUFhIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5cbmltcG9ydCB7IE9ic2VydmFibGUsIE9ic2VydmVyIH0gZnJvbSAncnhqcyc7XG5cbmltcG9ydCB7IEFnbUNpcmNsZSB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvY2lyY2xlJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0ICogYXMgbWFwVHlwZXMgZnJvbSAnLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIENpcmNsZU1hbmFnZXIge1xuICBwcml2YXRlIF9jaXJjbGVzOiBNYXA8QWdtQ2lyY2xlLCBQcm9taXNlPG1hcFR5cGVzLkNpcmNsZT4+ID1cbiAgICAgIG5ldyBNYXA8QWdtQ2lyY2xlLCBQcm9taXNlPG1hcFR5cGVzLkNpcmNsZT4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfYXBpV3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIsIHByaXZhdGUgX3pvbmU6IE5nWm9uZSkge31cblxuICBhZGRDaXJjbGUoY2lyY2xlOiBBZ21DaXJjbGUpIHtcbiAgICB0aGlzLl9jaXJjbGVzLnNldChjaXJjbGUsIHRoaXMuX2FwaVdyYXBwZXIuY3JlYXRlQ2lyY2xlKHtcbiAgICAgIGNlbnRlcjoge2xhdDogY2lyY2xlLmxhdGl0dWRlLCBsbmc6IGNpcmNsZS5sb25naXR1ZGV9LFxuICAgICAgY2xpY2thYmxlOiBjaXJjbGUuY2xpY2thYmxlLFxuICAgICAgZHJhZ2dhYmxlOiBjaXJjbGUuZHJhZ2dhYmxlLFxuICAgICAgZWRpdGFibGU6IGNpcmNsZS5lZGl0YWJsZSxcbiAgICAgIGZpbGxDb2xvcjogY2lyY2xlLmZpbGxDb2xvcixcbiAgICAgIGZpbGxPcGFjaXR5OiBjaXJjbGUuZmlsbE9wYWNpdHksXG4gICAgICByYWRpdXM6IGNpcmNsZS5yYWRpdXMsXG4gICAgICBzdHJva2VDb2xvcjogY2lyY2xlLnN0cm9rZUNvbG9yLFxuICAgICAgc3Ryb2tlT3BhY2l0eTogY2lyY2xlLnN0cm9rZU9wYWNpdHksXG4gICAgICBzdHJva2VQb3NpdGlvbjogY2lyY2xlLnN0cm9rZVBvc2l0aW9uLFxuICAgICAgc3Ryb2tlV2VpZ2h0OiBjaXJjbGUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgdmlzaWJsZTogY2lyY2xlLnZpc2libGUsXG4gICAgICB6SW5kZXg6IGNpcmNsZS56SW5kZXgsXG4gICAgfSkpO1xuICB9XG5cbiAgLyoqXG4gICAqIFJlbW92ZXMgdGhlIGdpdmVuIGNpcmNsZSBmcm9tIHRoZSBtYXAuXG4gICAqL1xuICByZW1vdmVDaXJjbGUoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7XG4gICAgICBjLnNldE1hcChudWxsKTtcbiAgICAgIHRoaXMuX2NpcmNsZXMuZGVsZXRlKGNpcmNsZSk7XG4gICAgfSk7XG4gIH1cblxuICBzZXRPcHRpb25zKGNpcmNsZTogQWdtQ2lyY2xlLCBvcHRpb25zOiBtYXBUeXBlcy5DaXJjbGVPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4ge1xuICAgICAgaWYgKHR5cGVvZiBvcHRpb25zLnN0cm9rZVBvc2l0aW9uID09PSAnc3RyaW5nJykge1xuICAgICAgICBvcHRpb25zLnN0cm9rZVBvc2l0aW9uID0gZ29vZ2xlLm1hcHMuU3Ryb2tlUG9zaXRpb25bb3B0aW9ucy5zdHJva2VQb3NpdGlvbl07XG4gICAgICB9XG4gICAgICBjLnNldE9wdGlvbnMob3B0aW9ucyk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRCb3VuZHMoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPG1hcFR5cGVzLkxhdExuZ0JvdW5kcz4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IGMuZ2V0Qm91bmRzKCkpO1xuICB9XG5cbiAgZ2V0Q2VudGVyKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTxtYXBUeXBlcy5MYXRMbmc+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiBjLmdldENlbnRlcigpKTtcbiAgfVxuXG4gIGdldFJhZGl1cyhjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8bnVtYmVyPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4gYy5nZXRSYWRpdXMoKSk7XG4gIH1cblxuICBzZXRDZW50ZXIoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKFxuICAgICAgICAoYykgPT4geyByZXR1cm4gYy5zZXRDZW50ZXIoe2xhdDogY2lyY2xlLmxhdGl0dWRlLCBsbmc6IGNpcmNsZS5sb25naXR1ZGV9KTsgfSk7XG4gIH1cblxuICBzZXRFZGl0YWJsZShjaXJjbGU6IEFnbUNpcmNsZSk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpLnRoZW4oKGMpID0+IHsgcmV0dXJuIGMuc2V0RWRpdGFibGUoY2lyY2xlLmVkaXRhYmxlKTsgfSk7XG4gIH1cblxuICBzZXREcmFnZ2FibGUoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7IHJldHVybiBjLnNldERyYWdnYWJsZShjaXJjbGUuZHJhZ2dhYmxlKTsgfSk7XG4gIH1cblxuICBzZXRWaXNpYmxlKGNpcmNsZTogQWdtQ2lyY2xlKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgcmV0dXJuIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4geyByZXR1cm4gYy5zZXRWaXNpYmxlKGNpcmNsZS52aXNpYmxlKTsgfSk7XG4gIH1cblxuICBzZXRSYWRpdXMoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fY2lyY2xlcy5nZXQoY2lyY2xlKS50aGVuKChjKSA9PiB7IHJldHVybiBjLnNldFJhZGl1cyhjaXJjbGUucmFkaXVzKTsgfSk7XG4gIH1cblxuICBnZXROYXRpdmVDaXJjbGUoY2lyY2xlOiBBZ21DaXJjbGUpOiBQcm9taXNlPG1hcFR5cGVzLkNpcmNsZT4ge1xuICAgIHJldHVybiB0aGlzLl9jaXJjbGVzLmdldChjaXJjbGUpO1xuICB9XG5cbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBjaXJjbGU6IEFnbUNpcmNsZSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICBsZXQgbGlzdGVuZXI6IG1hcFR5cGVzLk1hcHNFdmVudExpc3RlbmVyID0gbnVsbDtcbiAgICAgIHRoaXMuX2NpcmNsZXMuZ2V0KGNpcmNsZSkudGhlbigoYykgPT4ge1xuICAgICAgICBsaXN0ZW5lciA9IGMuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgfSk7XG5cbiAgICAgIHJldHVybiAoKSA9PiB7XG4gICAgICAgIGlmIChsaXN0ZW5lciAhPT0gbnVsbCkge1xuICAgICAgICAgIGxpc3RlbmVyLnJlbW92ZSgpO1xuICAgICAgICB9XG4gICAgICB9O1xuICAgIH0pO1xuICB9XG59XG4iXX0=