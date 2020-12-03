import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { merge, Observable } from 'rxjs';
import { map, skip, startWith, switchMap } from 'rxjs/operators';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolygonManager = /** @class */ (function () {
    function PolygonManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polygons = new Map();
    }
    PolygonManager.prototype.addPolygon = function (path) {
        var polygonPromise = this._mapsWrapper.createPolygon({
            clickable: path.clickable,
            draggable: path.draggable,
            editable: path.editable,
            fillColor: path.fillColor,
            fillOpacity: path.fillOpacity,
            geodesic: path.geodesic,
            paths: path.paths,
            strokeColor: path.strokeColor,
            strokeOpacity: path.strokeOpacity,
            strokeWeight: path.strokeWeight,
            visible: path.visible,
            zIndex: path.zIndex,
        });
        this._polygons.set(path, polygonPromise);
    };
    PolygonManager.prototype.updatePolygon = function (polygon) {
        var _this = this;
        var m = this._polygons.get(polygon);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPaths(polygon.paths); }); });
    };
    PolygonManager.prototype.setPolygonOptions = function (path, options) {
        return this._polygons.get(path).then(function (l) { l.setOptions(options); });
    };
    PolygonManager.prototype.deletePolygon = function (paths) {
        var _this = this;
        var m = this._polygons.get(paths);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polygons.delete(paths);
            });
        });
    };
    PolygonManager.prototype.getPath = function (polygon) {
        return this._polygons.get(polygon)
            .then(function (polygon) { return polygon.getPath().getArray(); });
    };
    PolygonManager.prototype.getPaths = function (polygon) {
        return this._polygons.get(polygon)
            .then(function (polygon) { return polygon.getPaths().getArray().map(function (p) { return p.getArray(); }); });
    };
    PolygonManager.prototype.createEventObservable = function (eventName, path) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polygons.get(path).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolygonManager.prototype.createPathEventObservable = function (agmPolygon) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var polygon, paths, pathsChanges$;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._polygons.get(agmPolygon)];
                    case 1:
                        polygon = _a.sent();
                        paths = polygon.getPaths();
                        pathsChanges$ = createMVCEventObservable(paths);
                        return [2 /*return*/, pathsChanges$.pipe(startWith({ newArr: paths.getArray() }), // in order to subscribe to them all
                            switchMap(function (parentMVEvent) { return merge.apply(void 0, tslib_1.__spread(// rest parameter
                            parentMVEvent.newArr.map(function (chMVC, index) {
                                return createMVCEventObservable(chMVC)
                                    .pipe(map(function (chMVCEvent) { return ({ parentMVEvent: parentMVEvent, chMVCEvent: chMVCEvent, pathIndex: index }); }));
                            }))).pipe(startWith({ parentMVEvent: parentMVEvent, chMVCEvent: null, pathIndex: null })); }), // start the merged ob with an event signinifing change to parent
                            skip(1), // skip the manually added event
                            map(function (_a) {
                                var parentMVEvent = _a.parentMVEvent, chMVCEvent = _a.chMVCEvent, pathIndex = _a.pathIndex;
                                var retVal;
                                if (!chMVCEvent) {
                                    retVal = {
                                        newArr: parentMVEvent.newArr.map(function (subArr) { return subArr.getArray().map(function (latLng) { return latLng.toJSON(); }); }),
                                        eventName: parentMVEvent.evName,
                                        index: parentMVEvent.index,
                                    };
                                    if (parentMVEvent.previous) {
                                        retVal.previous = parentMVEvent.previous.getArray();
                                    }
                                }
                                else {
                                    retVal = {
                                        newArr: parentMVEvent.newArr.map(function (subArr) { return subArr.getArray().map(function (latLng) { return latLng.toJSON(); }); }),
                                        pathIndex: pathIndex,
                                        eventName: chMVCEvent.evName,
                                        index: chMVCEvent.index,
                                    };
                                    if (chMVCEvent.previous) {
                                        retVal.previous = chMVCEvent.previous;
                                    }
                                }
                                return retVal;
                            }))];
                }
            });
        });
    };
    PolygonManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    PolygonManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], PolygonManager);
    return PolygonManager;
}());
export { PolygonManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWdvbi1tYW5hZ2VyLmpzIiwic291cmNlUm9vdCI6Im5nOi8vQGFnbS9jb3JlLyIsInNvdXJjZXMiOlsic2VydmljZXMvbWFuYWdlcnMvcG9seWdvbi1tYW5hZ2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sRUFBRSxNQUFNLGVBQWUsQ0FBQztBQUNuRCxPQUFPLEVBQUUsS0FBSyxFQUFFLFVBQVUsRUFBWSxNQUFNLE1BQU0sQ0FBQztBQUNuRCxPQUFPLEVBQUUsR0FBRyxFQUFFLElBQUksRUFBRSxTQUFTLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0JBQWdCLENBQUM7QUFHakUsT0FBTyxFQUFFLHdCQUF3QixFQUFZLE1BQU0sNEJBQTRCLENBQUM7QUFDaEYsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFJbEU7SUFJRSx3QkFBb0IsWUFBa0MsRUFBVSxLQUFhO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIckUsY0FBUyxHQUNmLElBQUksR0FBRyxFQUFnQyxDQUFDO0lBRXVDLENBQUM7SUFFbEYsbUNBQVUsR0FBVixVQUFXLElBQWdCO1FBQ3pCLElBQU0sY0FBYyxHQUFHLElBQUksQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDO1lBQ3JELFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixTQUFTLEVBQUUsSUFBSSxDQUFDLFNBQVM7WUFDekIsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLFNBQVMsRUFBRSxJQUFJLENBQUMsU0FBUztZQUN6QixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsUUFBUSxFQUFFLElBQUksQ0FBQyxRQUFRO1lBQ3ZCLEtBQUssRUFBRSxJQUFJLENBQUMsS0FBSztZQUNqQixXQUFXLEVBQUUsSUFBSSxDQUFDLFdBQVc7WUFDN0IsYUFBYSxFQUFFLElBQUksQ0FBQyxh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LENBQUMsRUFBQzs7OztLQUNQOztnQkFsR2lDLG9CQUFvQjtnQkFBaUIsTUFBTTs7SUFKbEUsY0FBYztRQUQxQixVQUFVLEVBQUU7aURBS3VCLG9CQUFvQixFQUFpQixNQUFNO09BSmxFLGNBQWMsQ0F1RzFCO0lBQUQscUJBQUM7Q0FBQSxBQXZHRCxJQXVHQztTQXZHWSxjQUFjIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgSW5qZWN0YWJsZSwgTmdab25lIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBtZXJnZSwgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcbmltcG9ydCB7IG1hcCwgc2tpcCwgc3RhcnRXaXRoLCBzd2l0Y2hNYXAgfSBmcm9tICdyeGpzL29wZXJhdG9ycyc7XG5cbmltcG9ydCB7IEFnbVBvbHlnb24sIFBhdGhDaGFuZ2VQb2x5Z29uUGF0aEV2ZW50LCBQYXRoQ29sbGVjdGlvbkNoYW5nZVBvbHlnb25QYXRoRXZlbnQsIFBvbHlnb25QYXRoRXZlbnQgfSBmcm9tICcuLi8uLi9kaXJlY3RpdmVzL3BvbHlnb24nO1xuaW1wb3J0IHsgY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlLCBNVkNFdmVudCB9IGZyb20gJy4uLy4uL3V0aWxzL212Y2FycmF5LXV0aWxzJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHsgTGF0TG5nLCBNVkNBcnJheSwgUG9seWdvbiB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLXR5cGVzJztcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvbHlnb25NYW5hZ2VyIHtcbiAgcHJpdmF0ZSBfcG9seWdvbnM6IE1hcDxBZ21Qb2x5Z29uLCBQcm9taXNlPFBvbHlnb24+PiA9XG4gICAgbmV3IE1hcDxBZ21Qb2x5Z29uLCBQcm9taXNlPFBvbHlnb24+PigpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX21hcHNXcmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlciwgcHJpdmF0ZSBfem9uZTogTmdab25lKSB7IH1cblxuICBhZGRQb2x5Z29uKHBhdGg6IEFnbVBvbHlnb24pIHtcbiAgICBjb25zdCBwb2x5Z29uUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZVBvbHlnb24oe1xuICAgICAgY2xpY2thYmxlOiBwYXRoLmNsaWNrYWJsZSxcbiAgICAgIGRyYWdnYWJsZTogcGF0aC5kcmFnZ2FibGUsXG4gICAgICBlZGl0YWJsZTogcGF0aC5lZGl0YWJsZSxcbiAgICAgIGZpbGxDb2xvcjogcGF0aC5maWxsQ29sb3IsXG4gICAgICBmaWxsT3BhY2l0eTogcGF0aC5maWxsT3BhY2l0eSxcbiAgICAgIGdlb2Rlc2ljOiBwYXRoLmdlb2Rlc2ljLFxuICAgICAgcGF0aHM6IHBhdGgucGF0aHMsXG4gICAgICBzdHJva2VDb2xvcjogcGF0aC5zdHJva2VDb2xvcixcbiAgICAgIHN0cm9rZU9wYWNpdHk6IHBhdGguc3Ryb2tlT3BhY2l0eSxcbiAgICAgIHN0cm9rZVdlaWdodDogcGF0aC5zdHJva2VXZWlnaHQsXG4gICAgICB2aXNpYmxlOiBwYXRoLnZpc2libGUsXG4gICAgICB6SW5kZXg6IHBhdGguekluZGV4LFxuICAgIH0pO1xuICAgIHRoaXMuX3BvbHlnb25zLnNldChwYXRoLCBwb2x5Z29uUHJvbWlzZSk7XG4gIH1cblxuICB1cGRhdGVQb2x5Z29uKHBvbHlnb246IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbigobDogUG9seWdvbikgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4geyBsLnNldFBhdGhzKHBvbHlnb24ucGF0aHMpOyB9KSk7XG4gIH1cblxuICBzZXRQb2x5Z29uT3B0aW9ucyhwYXRoOiBBZ21Qb2x5Z29uLCBvcHRpb25zOiB7IFtwcm9wTmFtZTogc3RyaW5nXTogYW55IH0pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGgpLnRoZW4oKGw6IFBvbHlnb24pID0+IHsgbC5zZXRPcHRpb25zKG9wdGlvbnMpOyB9KTtcbiAgfVxuXG4gIGRlbGV0ZVBvbHlnb24ocGF0aHM6IEFnbVBvbHlnb24pOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWdvbnMuZ2V0KHBhdGhzKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlnb24pID0+IHtcbiAgICAgIHJldHVybiB0aGlzLl96b25lLnJ1bigoKSA9PiB7XG4gICAgICAgIGwuc2V0TWFwKG51bGwpO1xuICAgICAgICB0aGlzLl9wb2x5Z29ucy5kZWxldGUocGF0aHMpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBnZXRQYXRoKHBvbHlnb246IEFnbVBvbHlnb24pOiBQcm9taXNlPEFycmF5PExhdExuZz4+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9seWdvbnMuZ2V0KHBvbHlnb24pXG4gICAgICAudGhlbigocG9seWdvbikgPT4gcG9seWdvbi5nZXRQYXRoKCkuZ2V0QXJyYXkoKSk7XG4gIH1cblxuICBnZXRQYXRocyhwb2x5Z29uOiBBZ21Qb2x5Z29uKTogUHJvbWlzZTxBcnJheTxBcnJheTxMYXRMbmc+Pj4ge1xuICAgIHJldHVybiB0aGlzLl9wb2x5Z29ucy5nZXQocG9seWdvbilcbiAgICAgIC50aGVuKChwb2x5Z29uKSA9PiBwb2x5Z29uLmdldFBhdGhzKCkuZ2V0QXJyYXkoKS5tYXAoKHApID0+IHAuZ2V0QXJyYXkoKSkpO1xuICB9XG5cbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBwYXRoOiBBZ21Qb2x5Z29uKTogT2JzZXJ2YWJsZTxUPiB7XG4gICAgcmV0dXJuIG5ldyBPYnNlcnZhYmxlKChvYnNlcnZlcjogT2JzZXJ2ZXI8VD4pID0+IHtcbiAgICAgIHRoaXMuX3BvbHlnb25zLmdldChwYXRoKS50aGVuKChsOiBQb2x5Z29uKSA9PiB7XG4gICAgICAgIGwuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKGFnbVBvbHlnb246IEFnbVBvbHlnb24pOiBQcm9taXNlPE9ic2VydmFibGU8UG9seWdvblBhdGhFdmVudDxhbnk+Pj4ge1xuICAgIGNvbnN0IHBvbHlnb24gPSBhd2FpdCB0aGlzLl9wb2x5Z29ucy5nZXQoYWdtUG9seWdvbik7XG4gICAgY29uc3QgcGF0aHMgPSBwb2x5Z29uLmdldFBhdGhzKCk7XG4gICAgY29uc3QgcGF0aHNDaGFuZ2VzJCA9IGNyZWF0ZU1WQ0V2ZW50T2JzZXJ2YWJsZShwYXRocyk7XG4gICAgcmV0dXJuIHBhdGhzQ2hhbmdlcyQucGlwZShzdGFydFdpdGgoKHsgbmV3QXJyOiBwYXRocy5nZXRBcnJheSgpIH0gYXMgTVZDRXZlbnQ8TVZDQXJyYXk8TGF0TG5nPj4pKSwgLy8gaW4gb3JkZXIgdG8gc3Vic2NyaWJlIHRvIHRoZW0gYWxsXG4gICAgICBzd2l0Y2hNYXAocGFyZW50TVZFdmVudCA9PiBtZXJnZSguLi4vLyByZXN0IHBhcmFtZXRlclxuICAgICAgICBwYXJlbnRNVkV2ZW50Lm5ld0Fyci5tYXAoKGNoTVZDLCBpbmRleCkgPT5cbiAgICAgICAgICBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUoY2hNVkMpXG4gICAgICAgICAgLnBpcGUobWFwKGNoTVZDRXZlbnQgPT4gKHsgcGFyZW50TVZFdmVudCwgY2hNVkNFdmVudCwgcGF0aEluZGV4OiBpbmRleCB9KSkpKSlcbiAgICAgICAgLnBpcGUoc3RhcnRXaXRoKHsgcGFyZW50TVZFdmVudCwgY2hNVkNFdmVudDogbnVsbCwgcGF0aEluZGV4OiBudWxsIH0pKSksIC8vIHN0YXJ0IHRoZSBtZXJnZWQgb2Igd2l0aCBhbiBldmVudCBzaWduaW5pZmluZyBjaGFuZ2UgdG8gcGFyZW50XG4gICAgICBza2lwKDEpLCAvLyBza2lwIHRoZSBtYW51YWxseSBhZGRlZCBldmVudFxuICAgICAgbWFwKCh7IHBhcmVudE1WRXZlbnQsIGNoTVZDRXZlbnQsIHBhdGhJbmRleCB9KSA9PiB7XG4gICAgICAgIGxldCByZXRWYWw7XG4gICAgICAgIGlmICghY2hNVkNFdmVudCkge1xuICAgICAgICAgIHJldFZhbCA9IHtcbiAgICAgICAgICAgIG5ld0FycjogcGFyZW50TVZFdmVudC5uZXdBcnIubWFwKHN1YkFyciA9PiBzdWJBcnIuZ2V0QXJyYXkoKS5tYXAobGF0TG5nID0+IGxhdExuZy50b0pTT04oKSkpLFxuICAgICAgICAgICAgZXZlbnROYW1lOiBwYXJlbnRNVkV2ZW50LmV2TmFtZSxcbiAgICAgICAgICAgIGluZGV4OiBwYXJlbnRNVkV2ZW50LmluZGV4LFxuICAgICAgICAgIH0gYXMgUGF0aENvbGxlY3Rpb25DaGFuZ2VQb2x5Z29uUGF0aEV2ZW50O1xuICAgICAgICAgIGlmIChwYXJlbnRNVkV2ZW50LnByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXRWYWwucHJldmlvdXMgPSAgcGFyZW50TVZFdmVudC5wcmV2aW91cy5nZXRBcnJheSgpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXRWYWwgPSB7XG4gICAgICAgICAgICBuZXdBcnI6IHBhcmVudE1WRXZlbnQubmV3QXJyLm1hcChzdWJBcnIgPT4gc3ViQXJyLmdldEFycmF5KCkubWFwKGxhdExuZyA9PiBsYXRMbmcudG9KU09OKCkpKSxcbiAgICAgICAgICAgIHBhdGhJbmRleCxcbiAgICAgICAgICAgIGV2ZW50TmFtZTogY2hNVkNFdmVudC5ldk5hbWUsXG4gICAgICAgICAgICBpbmRleDogY2hNVkNFdmVudC5pbmRleCxcbiAgICAgICAgICB9IGFzIFBhdGhDaGFuZ2VQb2x5Z29uUGF0aEV2ZW50O1xuICAgICAgICAgIGlmIChjaE1WQ0V2ZW50LnByZXZpb3VzKSB7XG4gICAgICAgICAgICByZXRWYWwucHJldmlvdXMgPSBjaE1WQ0V2ZW50LnByZXZpb3VzO1xuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcmV0VmFsO1xuICAgICAgfSkpO1xuICB9XG59XG4iXX0=