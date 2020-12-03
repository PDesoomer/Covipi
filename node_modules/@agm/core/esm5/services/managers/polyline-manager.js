import * as tslib_1 from "tslib";
import { Injectable, NgZone } from '@angular/core';
import { Observable } from 'rxjs';
import { createMVCEventObservable } from '../../utils/mvcarray-utils';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
var PolylineManager = /** @class */ (function () {
    function PolylineManager(_mapsWrapper, _zone) {
        this._mapsWrapper = _mapsWrapper;
        this._zone = _zone;
        this._polylines = new Map();
    }
    PolylineManager_1 = PolylineManager;
    PolylineManager._convertPoints = function (line) {
        var path = line._getPoints().map(function (point) {
            return { lat: point.latitude, lng: point.longitude };
        });
        return path;
    };
    PolylineManager._convertPath = function (path) {
        var symbolPath = google.maps.SymbolPath[path];
        if (typeof symbolPath === 'number') {
            return symbolPath;
        }
        else {
            return path;
        }
    };
    PolylineManager._convertIcons = function (line) {
        var icons = line._getIcons().map(function (agmIcon) { return ({
            fixedRotation: agmIcon.fixedRotation,
            offset: agmIcon.offset,
            repeat: agmIcon.repeat,
            icon: {
                anchor: new google.maps.Point(agmIcon.anchorX, agmIcon.anchorY),
                fillColor: agmIcon.fillColor,
                fillOpacity: agmIcon.fillOpacity,
                path: PolylineManager_1._convertPath(agmIcon.path),
                rotation: agmIcon.rotation,
                scale: agmIcon.scale,
                strokeColor: agmIcon.strokeColor,
                strokeOpacity: agmIcon.strokeOpacity,
                strokeWeight: agmIcon.strokeWeight,
            },
        }); });
        // prune undefineds;
        icons.forEach(function (icon) {
            Object.entries(icon).forEach(function (_a) {
                var _b = tslib_1.__read(_a, 2), key = _b[0], val = _b[1];
                if (typeof val === 'undefined') {
                    delete icon[key];
                }
            });
            if (typeof icon.icon.anchor.x === 'undefined' ||
                typeof icon.icon.anchor.y === 'undefined') {
                delete icon.icon.anchor;
            }
        });
        return icons;
    };
    PolylineManager.prototype.addPolyline = function (line) {
        var _this = this;
        var polylinePromise = this._mapsWrapper.getNativeMap()
            .then(function () { return [PolylineManager_1._convertPoints(line),
            PolylineManager_1._convertIcons(line)]; })
            .then(function (_a) {
            var _b = tslib_1.__read(_a, 2), path = _b[0], icons = _b[1];
            return _this._mapsWrapper.createPolyline({
                clickable: line.clickable,
                draggable: line.draggable,
                editable: line.editable,
                geodesic: line.geodesic,
                strokeColor: line.strokeColor,
                strokeOpacity: line.strokeOpacity,
                strokeWeight: line.strokeWeight,
                visible: line.visible,
                zIndex: line.zIndex,
                path: path,
                icons: icons,
            });
        });
        this._polylines.set(line, polylinePromise);
    };
    PolylineManager.prototype.updatePolylinePoints = function (line) {
        var _this = this;
        var path = PolylineManager_1._convertPoints(line);
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) { return _this._zone.run(function () { l.setPath(path); }); });
    };
    PolylineManager.prototype.updateIconSequences = function (line) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var icons, m;
            var _this = this;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._mapsWrapper.getNativeMap()];
                    case 1:
                        _a.sent();
                        icons = PolylineManager_1._convertIcons(line);
                        m = this._polylines.get(line);
                        if (m == null) {
                            return [2 /*return*/];
                        }
                        return [2 /*return*/, m.then(function (l) { return _this._zone.run(function () { return l.setOptions({ icons: icons }); }); })];
                }
            });
        });
    };
    PolylineManager.prototype.setPolylineOptions = function (line, options) {
        return this._polylines.get(line).then(function (l) { l.setOptions(options); });
    };
    PolylineManager.prototype.deletePolyline = function (line) {
        var _this = this;
        var m = this._polylines.get(line);
        if (m == null) {
            return Promise.resolve();
        }
        return m.then(function (l) {
            return _this._zone.run(function () {
                l.setMap(null);
                _this._polylines.delete(line);
            });
        });
    };
    PolylineManager.prototype.getMVCPath = function (agmPolyline) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var polyline;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this._polylines.get(agmPolyline)];
                    case 1:
                        polyline = _a.sent();
                        return [2 /*return*/, polyline.getPath()];
                }
            });
        });
    };
    PolylineManager.prototype.getPath = function (agmPolyline) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMVCPath(agmPolyline)];
                    case 1: return [2 /*return*/, (_a.sent()).getArray()];
                }
            });
        });
    };
    PolylineManager.prototype.createEventObservable = function (eventName, line) {
        var _this = this;
        return new Observable(function (observer) {
            _this._polylines.get(line).then(function (l) {
                l.addListener(eventName, function (e) { return _this._zone.run(function () { return observer.next(e); }); });
            });
        });
    };
    PolylineManager.prototype.createPathEventObservable = function (line) {
        return tslib_1.__awaiter(this, void 0, void 0, function () {
            var mvcPath;
            return tslib_1.__generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getMVCPath(line)];
                    case 1:
                        mvcPath = _a.sent();
                        return [2 /*return*/, createMVCEventObservable(mvcPath)];
                }
            });
        });
    };
    var PolylineManager_1;
    PolylineManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper },
        { type: NgZone }
    ]; };
    PolylineManager = PolylineManager_1 = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper, NgZone])
    ], PolylineManager);
    return PolylineManager;
}());
export { PolylineManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9seWxpbmUtbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL3BvbHlsaW5lLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxFQUFFLE1BQU0sZUFBZSxDQUFDO0FBQ25ELE9BQU8sRUFBRSxVQUFVLEVBQVksTUFBTSxNQUFNLENBQUM7QUFJNUMsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDdEUsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFNbEU7SUFJRSx5QkFBb0IsWUFBa0MsRUFBVSxLQUFhO1FBQXpELGlCQUFZLEdBQVosWUFBWSxDQUFzQjtRQUFVLFVBQUssR0FBTCxLQUFLLENBQVE7UUFIckUsZUFBVSxHQUNkLElBQUksR0FBRyxFQUFrQyxDQUFDO0lBRWtDLENBQUM7d0JBSnRFLGVBQWU7SUFNWCw4QkFBYyxHQUE3QixVQUE4QixJQUFpQjtRQUM3QyxJQUFNLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUMsR0FBRyxDQUFDLFVBQUMsS0FBdUI7WUFDekQsT0FBTyxFQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRSxLQUFLLENBQUMsU0FBUyxFQUFrQixDQUFDO1FBQ3RFLENBQUMsQ0FBQyxDQUFDO1FBQ0gsT0FBTyxJQUFJLENBQUM7SUFDZCxDQUFDO0lBRWMsNEJBQVksR0FBM0IsVUFBNEIsSUFDRztRQUM3QixJQUFNLFVBQVUsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUNoRCxJQUFJLE9BQU8sVUFBVSxLQUFLLFFBQVEsRUFBRTtZQUNsQyxPQUFPLFVBQVUsQ0FBQztTQUNuQjthQUFLO1lBQ0osT0FBTyxJQUFJLENBQUM7U0FDYjtJQUNILENB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Q0FBcUIsR0FBckIsVUFBeUIsU0FBaUIsRUFBRSxJQUFpQjtRQUE3RCxpQkFNQztRQUxDLE9BQU8sSUFBSSxVQUFVLENBQUMsVUFBQyxRQUFxQjtZQUMxQyxLQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBQyxDQUFXO2dCQUN6QyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxVQUFDLENBQUksSUFBSyxPQUFBLEtBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLGNBQU0sT0FBQSxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxFQUFoQixDQUFnQixDQUFDLEVBQXRDLENBQXNDLENBQUMsQ0FBQztZQUM3RSxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVLLG1EQUF5QixHQUEvQixVQUFnQyxJQUFpQjs7Ozs7NEJBQy9CLHFCQUFNLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUE7O3dCQUFyQyxPQUFPLEdBQUcsU0FBMkI7d0JBQzNDLHNCQUFPLHdCQUF3QixDQUFDLE9BQU8sQ0FBQyxFQUFDOzs7O0tBQzFDOzs7Z0JBaklpQyxvQkFBb0I7Z0JBQWlCLE1BQU07O0lBSmxFLGVBQWU7UUFEM0IsVUFBVSxFQUFFO2lEQUt1QixvQkFBb0IsRUFBaUIsTUFBTTtPQUpsRSxlQUFlLENBc0kzQjtJQUFELHNCQUFDO0NBQUEsQUF0SUQsSUFzSUM7U0F0SVksZUFBZSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUsIE5nWm9uZSB9IGZyb20gJ0Bhbmd1bGFyL2NvcmUnO1xuaW1wb3J0IHsgT2JzZXJ2YWJsZSwgT2JzZXJ2ZXIgfSBmcm9tICdyeGpzJztcblxuaW1wb3J0IHsgQWdtUG9seWxpbmUsIFBhdGhFdmVudCB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcG9seWxpbmUnO1xuaW1wb3J0IHsgQWdtUG9seWxpbmVQb2ludCB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvcG9seWxpbmUtcG9pbnQnO1xuaW1wb3J0IHsgY3JlYXRlTVZDRXZlbnRPYnNlcnZhYmxlIH0gZnJvbSAnLi4vLi4vdXRpbHMvbXZjYXJyYXktdXRpbHMnO1xuaW1wb3J0IHsgR29vZ2xlTWFwc0FQSVdyYXBwZXIgfSBmcm9tICcuLi9nb29nbGUtbWFwcy1hcGktd3JhcHBlcic7XG5pbXBvcnQgeyBJY29uU2VxdWVuY2UsIExhdExuZywgTGF0TG5nTGl0ZXJhbCwgTVZDQXJyYXksIFBvbHlsaW5lIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuXG5kZWNsYXJlIHZhciBnb29nbGU6IGFueTtcblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIFBvbHlsaW5lTWFuYWdlciB7XG4gIHByaXZhdGUgX3BvbHlsaW5lczogTWFwPEFnbVBvbHlsaW5lLCBQcm9taXNlPFBvbHlsaW5lPj4gPVxuICAgICAgbmV3IE1hcDxBZ21Qb2x5bGluZSwgUHJvbWlzZTxQb2x5bGluZT4+KCk7XG5cbiAgY29uc3RydWN0b3IocHJpdmF0ZSBfbWFwc1dyYXBwZXI6IEdvb2dsZU1hcHNBUElXcmFwcGVyLCBwcml2YXRlIF96b25lOiBOZ1pvbmUpIHt9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgX2NvbnZlcnRQb2ludHMobGluZTogQWdtUG9seWxpbmUpOiBBcnJheTxMYXRMbmdMaXRlcmFsPiB7XG4gICAgY29uc3QgcGF0aCA9IGxpbmUuX2dldFBvaW50cygpLm1hcCgocG9pbnQ6IEFnbVBvbHlsaW5lUG9pbnQpID0+IHtcbiAgICAgIHJldHVybiB7bGF0OiBwb2ludC5sYXRpdHVkZSwgbG5nOiBwb2ludC5sb25naXR1ZGV9IGFzIExhdExuZ0xpdGVyYWw7XG4gICAgfSk7XG4gICAgcmV0dXJuIHBhdGg7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBfY29udmVydFBhdGgocGF0aDogJ0NJUkNMRScgfCAnQkFDS1dBUkRfQ0xPU0VEX0FSUk9XJyB8ICdCQUNLV0FSRF9PUEVOX0FSUk9XJyB8ICdGT1JXQVJEX0NMT1NFRF9BUlJPVycgfFxuICAnRk9SV0FSRF9DTE9TRURfQVJST1cnIHwgc3RyaW5nKTogbnVtYmVyIHwgc3RyaW5ne1xuICAgIGNvbnN0IHN5bWJvbFBhdGggPSBnb29nbGUubWFwcy5TeW1ib2xQYXRoW3BhdGhdO1xuICAgIGlmICh0eXBlb2Ygc3ltYm9sUGF0aCA9PT0gJ251bWJlcicpIHtcbiAgICAgIHJldHVybiBzeW1ib2xQYXRoO1xuICAgIH0gZWxzZXtcbiAgICAgIHJldHVybiBwYXRoO1xuICAgIH1cbiAgfVxuXG4gIHByaXZhdGUgc3RhdGljIF9jb252ZXJ0SWNvbnMobGluZTogQWdtUG9seWxpbmUpOiBBcnJheTxJY29uU2VxdWVuY2U+IHtcbiAgICBjb25zdCBpY29ucyA9IGxpbmUuX2dldEljb25zKCkubWFwKGFnbUljb24gPT4gKHtcbiAgICAgIGZpeGVkUm90YXRpb246IGFnbUljb24uZml4ZWRSb3RhdGlvbixcbiAgICAgIG9mZnNldDogYWdtSWNvbi5vZmZzZXQsXG4gICAgICByZXBlYXQ6IGFnbUljb24ucmVwZWF0LFxuICAgICAgaWNvbjoge1xuICAgICAgICBhbmNob3I6IG5ldyBnb29nbGUubWFwcy5Qb2ludChhZ21JY29uLmFuY2hvclgsIGFnbUljb24uYW5jaG9yWSksXG4gICAgICAgIGZpbGxDb2xvcjogYWdtSWNvbi5maWxsQ29sb3IsXG4gICAgICAgIGZpbGxPcGFjaXR5OiBhZ21JY29uLmZpbGxPcGFjaXR5LFxuICAgICAgICBwYXRoOiBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQYXRoKGFnbUljb24ucGF0aCksXG4gICAgICAgIHJvdGF0aW9uOiBhZ21JY29uLnJvdGF0aW9uLFxuICAgICAgICBzY2FsZTogYWdtSWNvbi5zY2FsZSxcbiAgICAgICAgc3Ryb2tlQ29sb3I6IGFnbUljb24uc3Ryb2tlQ29sb3IsXG4gICAgICAgIHN0cm9rZU9wYWNpdHk6IGFnbUljb24uc3Ryb2tlT3BhY2l0eSxcbiAgICAgICAgc3Ryb2tlV2VpZ2h0OiBhZ21JY29uLnN0cm9rZVdlaWdodCxcbiAgICAgIH0sXG4gICAgfSBhcyBJY29uU2VxdWVuY2UpKTtcbiAgICAvLyBwcnVuZSB1bmRlZmluZWRzO1xuICAgIGljb25zLmZvckVhY2goaWNvbiA9PiB7XG4gICAgICBPYmplY3QuZW50cmllcyhpY29uKS5mb3JFYWNoKChba2V5LCB2YWxdKSA9PiB7XG4gICAgICAgIGlmICh0eXBlb2YgdmFsID09PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgIGRlbGV0ZSAoaWNvbiBhcyBhbnkpW2tleV07XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgaWYgKHR5cGVvZiBpY29uLmljb24uYW5jaG9yLnggPT09ICd1bmRlZmluZWQnIHx8XG4gICAgICAgIHR5cGVvZiBpY29uLmljb24uYW5jaG9yLnkgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgICAgZGVsZXRlIGljb24uaWNvbi5hbmNob3I7XG4gICAgICAgIH1cbiAgICB9KTtcbiAgICByZXR1cm4gaWNvbnM7XG4gIH1cblxuICBhZGRQb2x5bGluZShsaW5lOiBBZ21Qb2x5bGluZSkge1xuICAgIGNvbnN0IHBvbHlsaW5lUHJvbWlzZSA9IHRoaXMuX21hcHNXcmFwcGVyLmdldE5hdGl2ZU1hcCgpXG4gICAgLnRoZW4oKCkgPT4gWyBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRQb2ludHMobGluZSksXG4gICAgICAgICAgICAgICAgICBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRJY29ucyhsaW5lKV0pXG4gICAgLnRoZW4oKFtwYXRoLCBpY29uc106IFtMYXRMbmdMaXRlcmFsW10sIEljb25TZXF1ZW5jZVtdXSkgPT5cbiAgICAgIHRoaXMuX21hcHNXcmFwcGVyLmNyZWF0ZVBvbHlsaW5lKHtcbiAgICAgICAgY2xpY2thYmxlOiBsaW5lLmNsaWNrYWJsZSxcbiAgICAgICAgZHJhZ2dhYmxlOiBsaW5lLmRyYWdnYWJsZSxcbiAgICAgICAgZWRpdGFibGU6IGxpbmUuZWRpdGFibGUsXG4gICAgICAgIGdlb2Rlc2ljOiBsaW5lLmdlb2Rlc2ljLFxuICAgICAgICBzdHJva2VDb2xvcjogbGluZS5zdHJva2VDb2xvcixcbiAgICAgICAgc3Ryb2tlT3BhY2l0eTogbGluZS5zdHJva2VPcGFjaXR5LFxuICAgICAgICBzdHJva2VXZWlnaHQ6IGxpbmUuc3Ryb2tlV2VpZ2h0LFxuICAgICAgICB2aXNpYmxlOiBsaW5lLnZpc2libGUsXG4gICAgICAgIHpJbmRleDogbGluZS56SW5kZXgsXG4gICAgICAgIHBhdGg6IHBhdGgsXG4gICAgICAgIGljb25zOiBpY29ucyxcbiAgICB9KSk7XG4gICAgdGhpcy5fcG9seWxpbmVzLnNldChsaW5lLCBwb2x5bGluZVByb21pc2UpO1xuICB9XG5cbiAgdXBkYXRlUG9seWxpbmVQb2ludHMobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBwYXRoID0gUG9seWxpbmVNYW5hZ2VyLl9jb252ZXJ0UG9pbnRzKGxpbmUpO1xuICAgIGNvbnN0IG0gPSB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpO1xuICAgIGlmIChtID09IG51bGwpIHtcbiAgICAgIHJldHVybiBQcm9taXNlLnJlc29sdmUoKTtcbiAgICB9XG4gICAgcmV0dXJuIG0udGhlbigobDogUG9seWxpbmUpID0+IHsgcmV0dXJuIHRoaXMuX3pvbmUucnVuKCgpID0+IHsgbC5zZXRQYXRoKHBhdGgpOyB9KTsgfSk7XG4gIH1cblxuICBhc3luYyB1cGRhdGVJY29uU2VxdWVuY2VzKGxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgYXdhaXQgdGhpcy5fbWFwc1dyYXBwZXIuZ2V0TmF0aXZlTWFwKCk7XG4gICAgY29uc3QgaWNvbnMgPSBQb2x5bGluZU1hbmFnZXIuX2NvbnZlcnRJY29ucyhsaW5lKTtcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHJldHVybiBtLnRoZW4obCA9PiB0aGlzLl96b25lLnJ1bigoKSA9PiBsLnNldE9wdGlvbnMoe2ljb25zOiBpY29uc30pICkgKTtcbiAgfVxuXG4gIHNldFBvbHlsaW5lT3B0aW9ucyhsaW5lOiBBZ21Qb2x5bGluZSwgb3B0aW9uczoge1twcm9wTmFtZTogc3RyaW5nXTogYW55fSk6XG4gICAgICBQcm9taXNlPHZvaWQ+IHtcbiAgICByZXR1cm4gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKS50aGVuKChsOiBQb2x5bGluZSkgPT4geyBsLnNldE9wdGlvbnMob3B0aW9ucyk7IH0pO1xuICB9XG5cbiAgZGVsZXRlUG9seWxpbmUobGluZTogQWdtUG9seWxpbmUpOiBQcm9taXNlPHZvaWQ+IHtcbiAgICBjb25zdCBtID0gdGhpcy5fcG9seWxpbmVzLmdldChsaW5lKTtcbiAgICBpZiAobSA9PSBudWxsKSB7XG4gICAgICByZXR1cm4gUHJvbWlzZS5yZXNvbHZlKCk7XG4gICAgfVxuICAgIHJldHVybiBtLnRoZW4oKGw6IFBvbHlsaW5lKSA9PiB7XG4gICAgICByZXR1cm4gdGhpcy5fem9uZS5ydW4oKCkgPT4ge1xuICAgICAgICBsLnNldE1hcChudWxsKTtcbiAgICAgICAgdGhpcy5fcG9seWxpbmVzLmRlbGV0ZShsaW5lKTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBhc3luYyBnZXRNVkNQYXRoKGFnbVBvbHlsaW5lOiBBZ21Qb2x5bGluZSk6IFByb21pc2U8TVZDQXJyYXk8TGF0TG5nPj4ge1xuICAgIGNvbnN0IHBvbHlsaW5lID0gYXdhaXQgdGhpcy5fcG9seWxpbmVzLmdldChhZ21Qb2x5bGluZSk7XG4gICAgcmV0dXJuIHBvbHlsaW5lLmdldFBhdGgoKTtcbiAgfVxuXG4gIGFzeW5jIGdldFBhdGgoYWdtUG9seWxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTxBcnJheTxMYXRMbmc+PiB7XG4gICAgcmV0dXJuIChhd2FpdCB0aGlzLmdldE1WQ1BhdGgoYWdtUG9seWxpbmUpKS5nZXRBcnJheSgpO1xuICB9XG5cbiAgY3JlYXRlRXZlbnRPYnNlcnZhYmxlPFQ+KGV2ZW50TmFtZTogc3RyaW5nLCBsaW5lOiBBZ21Qb2x5bGluZSk6IE9ic2VydmFibGU8VD4ge1xuICAgIHJldHVybiBuZXcgT2JzZXJ2YWJsZSgob2JzZXJ2ZXI6IE9ic2VydmVyPFQ+KSA9PiB7XG4gICAgICB0aGlzLl9wb2x5bGluZXMuZ2V0KGxpbmUpLnRoZW4oKGw6IFBvbHlsaW5lKSA9PiB7XG4gICAgICAgIGwuYWRkTGlzdGVuZXIoZXZlbnROYW1lLCAoZTogVCkgPT4gdGhpcy5fem9uZS5ydW4oKCkgPT4gb2JzZXJ2ZXIubmV4dChlKSkpO1xuICAgICAgfSk7XG4gICAgfSk7XG4gIH1cblxuICBhc3luYyBjcmVhdGVQYXRoRXZlbnRPYnNlcnZhYmxlKGxpbmU6IEFnbVBvbHlsaW5lKTogUHJvbWlzZTxPYnNlcnZhYmxlPFBhdGhFdmVudD4+IHtcbiAgICBjb25zdCBtdmNQYXRoID0gYXdhaXQgdGhpcy5nZXRNVkNQYXRoKGxpbmUpO1xuICAgIHJldHVybiBjcmVhdGVNVkNFdmVudE9ic2VydmFibGUobXZjUGF0aCk7XG4gIH1cbn1cbiJdfQ==