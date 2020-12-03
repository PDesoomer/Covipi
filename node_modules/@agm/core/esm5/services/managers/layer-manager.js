import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */
var LayerManager = /** @class */ (function () {
    function LayerManager(_wrapper) {
        this._wrapper = _wrapper;
        this._layers = new Map();
    }
    /**
     * Adds a transit layer to a map instance.
     * @param {AgmTransitLayer} layer - a TransitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    LayerManager.prototype.addTransitLayer = function (layer, options) {
        var newLayer = this._wrapper.createTransitLayer(options);
        this._layers.set(layer, newLayer);
    };
    /**
     * Adds a bicycling layer to a map instance.
     * @param {AgmBicyclingLayer} layer - a bicycling layer object
     * @param {BicyclingLayerOptions} options - BicyclingLayer options
     * @returns void
     */
    LayerManager.prototype.addBicyclingLayer = function (layer, options) {
        var newLayer = this._wrapper.createBicyclingLayer(options);
        this._layers.set(layer, newLayer);
    };
    /**
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    LayerManager.prototype.deleteLayer = function (layer) {
        var _this = this;
        return this._layers.get(layer).then(function (currentLayer) {
            currentLayer.setMap(null);
            _this._layers.delete(layer);
        });
    };
    /**
     * Hide/Show a google map layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - the layer to hide/show
     * @param {TransitLayerOptions|BicyclingLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    LayerManager.prototype.toggleLayerVisibility = function (layer, options) {
        var _this = this;
        return this._layers.get(layer).then(function (currentLayer) {
            if (!options.visible) {
                currentLayer.setMap(null);
                return;
            }
            else {
                return _this._wrapper.getNativeMap().then(function (map) {
                    currentLayer.setMap(map);
                });
            }
        });
    };
    LayerManager.ctorParameters = function () { return [
        { type: GoogleMapsAPIWrapper }
    ]; };
    LayerManager = tslib_1.__decorate([
        Injectable(),
        tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper])
    ], LayerManager);
    return LayerManager;
}());
export { LayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbEU7O0dBRUc7QUFHSDtJQUlJLHNCQUFvQixRQUE4QjtRQUE5QixhQUFRLEdBQVIsUUFBUSxDQUFzQjtRQUgxQyxZQUFPLEdBQ1gsSUFBSSxHQUFHLEVBQStFLENBQUM7SUFFdEMsQ0FBQztJQUV0RDs7Ozs7T0FLRztJQUNILHNDQUFlLEdBQWYsVUFBZ0IsS0FBc0IsRUFBRSxPQUE0QjtRQUNoRSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzNELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7O09BS0c7SUFDSCx3Q0FBaUIsR0FBakIsVUFBa0IsS0FBd0IsRUFBRSxPQUE4QjtRQUN0RSxJQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILGtDQUFXLEdBQVgsVUFBWSxLQUEwQztRQUF0RCxpQkFLQztRQUpHLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLENBQUMsSUFBSSxDQUFDLFVBQUEsWUFBWTtZQUM1QyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLEtBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsNENBQXFCLEdBQXJCLFVBQXNCLEtBQTBDLEVBQUUsT0FBb0Q7UUFBdEgsaUJBV0M7UUFWRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxVQUFBLFlBQVk7WUFDNUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxPQUFPLEVBQUU7Z0JBQ2xCLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzFCLE9BQU87YUFDVjtpQkFBTTtnQkFDSixPQUFPLEtBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxFQUFFLENBQUMsSUFBSSxDQUFFLFVBQUMsR0FBYztvQkFDckQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7Z0JBckQ2QixvQkFBb0I7O0lBSnpDLFlBQVk7UUFEeEIsVUFBVSxFQUFFO2lEQUtxQixvQkFBb0I7T0FKekMsWUFBWSxDQTBEeEI7SUFBRCxtQkFBQztDQUFBLEFBMURELElBMERDO1NBMURZLFlBQVkiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBJbmplY3RhYmxlIH0gZnJvbSAnQGFuZ3VsYXIvY29yZSc7XG5pbXBvcnQgeyBBZ21CaWN5Y2xpbmdMYXllciB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvYmljeWNsaW5nLWxheWVyJztcbmltcG9ydCB7IEFnbVRyYW5zaXRMYXllciB9IGZyb20gJy4uLy4uL2RpcmVjdGl2ZXMvdHJhbnNpdC1sYXllcic7XG5pbXBvcnQgeyBHb29nbGVNYXBzQVBJV3JhcHBlciB9IGZyb20gJy4uL2dvb2dsZS1tYXBzLWFwaS13cmFwcGVyJztcbmltcG9ydCB7IEJpY3ljbGluZ0xheWVyLCBCaWN5Y2xpbmdMYXllck9wdGlvbnMsIEdvb2dsZU1hcCwgVHJhbnNpdExheWVyLCBUcmFuc2l0TGF5ZXJPcHRpb25zIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtdHlwZXMnO1xuXG4vKipcbiAqIFRoaXMgY2xhc3MgbWFuYWdlcyBUcmFuc2l0IGFuZCBCaWN5Y2xpbmcgTGF5ZXJzIGZvciBhIEdvb2dsZSBNYXAgaW5zdGFuY2UuXG4gKi9cblxuQEluamVjdGFibGUoKVxuZXhwb3J0IGNsYXNzIExheWVyTWFuYWdlciB7XG4gICAgcHJpdmF0ZSBfbGF5ZXJzOiBNYXA8QWdtVHJhbnNpdExheWVyIHwgQWdtQmljeWNsaW5nTGF5ZXIsIFByb21pc2U8VHJhbnNpdExheWVyIHwgQmljeWNsaW5nTGF5ZXI+PiA9XG4gICAgICAgIG5ldyBNYXA8QWdtVHJhbnNpdExheWVyIHwgQWdtQmljeWNsaW5nTGF5ZXIsIFByb21pc2U8VHJhbnNpdExheWVyIHwgQmljeWNsaW5nTGF5ZXI+PigpO1xuXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfd3JhcHBlcjogR29vZ2xlTWFwc0FQSVdyYXBwZXIpIHt9XG5cbiAgICAvKipcbiAgICAgKiBBZGRzIGEgdHJhbnNpdCBsYXllciB0byBhIG1hcCBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge0FnbVRyYW5zaXRMYXllcn0gbGF5ZXIgLSBhIFRyYW5zaXRMYXllciBvYmplY3RcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRMYXllck9wdGlvbnN9IG9wdGlvbnMgLSBUcmFuc2l0TGF5ZXJPcHRpb25zIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgYWRkVHJhbnNpdExheWVyKGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIsIG9wdGlvbnM6IFRyYW5zaXRMYXllck9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmNyZWF0ZVRyYW5zaXRMYXllcihvcHRpb25zKTtcbiAgICAgICAgdGhpcy5fbGF5ZXJzLnNldChsYXllciwgbmV3TGF5ZXIpO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSBiaWN5Y2xpbmcgbGF5ZXIgdG8gYSBtYXAgaW5zdGFuY2UuXG4gICAgICogQHBhcmFtIHtBZ21CaWN5Y2xpbmdMYXllcn0gbGF5ZXIgLSBhIGJpY3ljbGluZyBsYXllciBvYmplY3RcbiAgICAgKiBAcGFyYW0ge0JpY3ljbGluZ0xheWVyT3B0aW9uc30gb3B0aW9ucyAtIEJpY3ljbGluZ0xheWVyIG9wdGlvbnNcbiAgICAgKiBAcmV0dXJucyB2b2lkXG4gICAgICovXG4gICAgYWRkQmljeWNsaW5nTGF5ZXIobGF5ZXI6IEFnbUJpY3ljbGluZ0xheWVyLCBvcHRpb25zOiBCaWN5Y2xpbmdMYXllck9wdGlvbnMpOiB2b2lkIHtcbiAgICAgICAgY29uc3QgbmV3TGF5ZXIgPSB0aGlzLl93cmFwcGVyLmNyZWF0ZUJpY3ljbGluZ0xheWVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogRGVsZXRlcyBhIG1hcCBsYXllclxuICAgICAqIEBwYXJhbSB7QWdtVHJhbnNpdExheWVyfEFnbUJpY3ljbGluZ0xheWVyfSBsYXllciAtIHRoZSBsYXllciB0byBkZWxldGVcbiAgICAgKiBAcmV0dXJucyAgUHJvbWlzZTx2b2lkPlxuICAgICAqL1xuICAgIGRlbGV0ZUxheWVyKGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllcik6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihjdXJyZW50TGF5ZXIgPT4ge1xuICAgICAgICAgICAgY3VycmVudExheWVyLnNldE1hcChudWxsKTtcbiAgICAgICAgICAgIHRoaXMuX2xheWVycy5kZWxldGUobGF5ZXIpO1xuICAgICAgICB9KTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBIaWRlL1Nob3cgYSBnb29nbGUgbWFwIGxheWVyXG4gICAgICogQHBhcmFtIHsgQWdtVHJhbnNpdExheWVyfEFnbUJpY3ljbGluZ0xheWVyfSBsYXllciAtIHRoZSBsYXllciB0byBoaWRlL3Nob3dcbiAgICAgKiBAcGFyYW0ge1RyYW5zaXRMYXllck9wdGlvbnN8QmljeWNsaW5nTGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gdXNlZCB0byBzZXQgdmlzaWJpbGl0eSBvZiB0aGUgbGF5ZXJcbiAgICAgKiBAcmV0dXJucyBQcm9taXNlPHZvaWQ+XG4gICAgICovXG4gICAgdG9nZ2xlTGF5ZXJWaXNpYmlsaXR5KGxheWVyOiBBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllciwgb3B0aW9uczogVHJhbnNpdExheWVyT3B0aW9ucyB8IEJpY3ljbGluZ0xheWVyT3B0aW9ucyk6IFByb21pc2U8dm9pZD4ge1xuICAgICAgICByZXR1cm4gdGhpcy5fbGF5ZXJzLmdldChsYXllcikudGhlbihjdXJyZW50TGF5ZXIgPT4ge1xuICAgICAgICAgICAgaWYgKCFvcHRpb25zLnZpc2libGUpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50TGF5ZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICByZXR1cm4gdGhpcy5fd3JhcHBlci5nZXROYXRpdmVNYXAoKS50aGVuKCAobWFwOiBHb29nbGVNYXApID0+IHtcbiAgICAgICAgICAgICAgICAgICBjdXJyZW50TGF5ZXIuc2V0TWFwKG1hcCk7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbn1cbiJdfQ==