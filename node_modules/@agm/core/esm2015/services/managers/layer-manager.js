import * as tslib_1 from "tslib";
import { Injectable } from '@angular/core';
import { GoogleMapsAPIWrapper } from '../google-maps-api-wrapper';
/**
 * This class manages Transit and Bicycling Layers for a Google Map instance.
 */
let LayerManager = class LayerManager {
    constructor(_wrapper) {
        this._wrapper = _wrapper;
        this._layers = new Map();
    }
    /**
     * Adds a transit layer to a map instance.
     * @param {AgmTransitLayer} layer - a TransitLayer object
     * @param {TransitLayerOptions} options - TransitLayerOptions options
     * @returns void
     */
    addTransitLayer(layer, options) {
        const newLayer = this._wrapper.createTransitLayer(options);
        this._layers.set(layer, newLayer);
    }
    /**
     * Adds a bicycling layer to a map instance.
     * @param {AgmBicyclingLayer} layer - a bicycling layer object
     * @param {BicyclingLayerOptions} options - BicyclingLayer options
     * @returns void
     */
    addBicyclingLayer(layer, options) {
        const newLayer = this._wrapper.createBicyclingLayer(options);
        this._layers.set(layer, newLayer);
    }
    /**
     * Deletes a map layer
     * @param {AgmTransitLayer|AgmBicyclingLayer} layer - the layer to delete
     * @returns  Promise<void>
     */
    deleteLayer(layer) {
        return this._layers.get(layer).then(currentLayer => {
            currentLayer.setMap(null);
            this._layers.delete(layer);
        });
    }
    /**
     * Hide/Show a google map layer
     * @param { AgmTransitLayer|AgmBicyclingLayer} layer - the layer to hide/show
     * @param {TransitLayerOptions|BicyclingLayerOptions} options - used to set visibility of the layer
     * @returns Promise<void>
     */
    toggleLayerVisibility(layer, options) {
        return this._layers.get(layer).then(currentLayer => {
            if (!options.visible) {
                currentLayer.setMap(null);
                return;
            }
            else {
                return this._wrapper.getNativeMap().then((map) => {
                    currentLayer.setMap(map);
                });
            }
        });
    }
};
LayerManager.ctorParameters = () => [
    { type: GoogleMapsAPIWrapper }
];
LayerManager = tslib_1.__decorate([
    Injectable(),
    tslib_1.__metadata("design:paramtypes", [GoogleMapsAPIWrapper])
], LayerManager);
export { LayerManager };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGF5ZXItbWFuYWdlci5qcyIsInNvdXJjZVJvb3QiOiJuZzovL0BhZ20vY29yZS8iLCJzb3VyY2VzIjpbInNlcnZpY2VzL21hbmFnZXJzL2xheWVyLW1hbmFnZXIudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFHM0MsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFHbEU7O0dBRUc7QUFHSCxJQUFhLFlBQVksR0FBekIsTUFBYSxZQUFZO0lBSXJCLFlBQW9CLFFBQThCO1FBQTlCLGFBQVEsR0FBUixRQUFRLENBQXNCO1FBSDFDLFlBQU8sR0FDWCxJQUFJLEdBQUcsRUFBK0UsQ0FBQztJQUV0QyxDQUFDO0lBRXREOzs7OztPQUtHO0lBQ0gsZUFBZSxDQUFDLEtBQXNCLEVBQUUsT0FBNEI7UUFDaEUsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMzRCxJQUFJLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxLQUFLLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gsaUJBQWlCLENBQUMsS0FBd0IsRUFBRSxPQUE4QjtRQUN0RSxNQUFNLFFBQVEsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDLG9CQUFvQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzdELElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssRUFBRSxRQUFRLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7T0FJRztJQUNILFdBQVcsQ0FBQyxLQUEwQztRQUNsRCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQyxZQUFZLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQzFCLElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7OztPQUtHO0lBQ0gscUJBQXFCLENBQUMsS0FBMEMsRUFBRSxPQUFvRDtRQUNsSCxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsRUFBRTtZQUMvQyxJQUFJLENBQUMsT0FBTyxDQUFDLE9BQU8sRUFBRTtnQkFDbEIsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDMUIsT0FBTzthQUNWO2lCQUFNO2dCQUNKLE9BQU8sSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLEVBQUUsQ0FBQyxJQUFJLENBQUUsQ0FBQyxHQUFjLEVBQUUsRUFBRTtvQkFDekQsWUFBWSxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDNUIsQ0FBQyxDQUFDLENBQUM7YUFDTjtRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNKLENBQUE7O1lBdERpQyxvQkFBb0I7O0FBSnpDLFlBQVk7SUFEeEIsVUFBVSxFQUFFOzZDQUtxQixvQkFBb0I7R0FKekMsWUFBWSxDQTBEeEI7U0ExRFksWUFBWSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEluamVjdGFibGUgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbmltcG9ydCB7IEFnbUJpY3ljbGluZ0xheWVyIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy9iaWN5Y2xpbmctbGF5ZXInO1xuaW1wb3J0IHsgQWdtVHJhbnNpdExheWVyIH0gZnJvbSAnLi4vLi4vZGlyZWN0aXZlcy90cmFuc2l0LWxheWVyJztcbmltcG9ydCB7IEdvb2dsZU1hcHNBUElXcmFwcGVyIH0gZnJvbSAnLi4vZ29vZ2xlLW1hcHMtYXBpLXdyYXBwZXInO1xuaW1wb3J0IHsgQmljeWNsaW5nTGF5ZXIsIEJpY3ljbGluZ0xheWVyT3B0aW9ucywgR29vZ2xlTWFwLCBUcmFuc2l0TGF5ZXIsIFRyYW5zaXRMYXllck9wdGlvbnMgfSBmcm9tICcuLi9nb29nbGUtbWFwcy10eXBlcyc7XG5cbi8qKlxuICogVGhpcyBjbGFzcyBtYW5hZ2VzIFRyYW5zaXQgYW5kIEJpY3ljbGluZyBMYXllcnMgZm9yIGEgR29vZ2xlIE1hcCBpbnN0YW5jZS5cbiAqL1xuXG5ASW5qZWN0YWJsZSgpXG5leHBvcnQgY2xhc3MgTGF5ZXJNYW5hZ2VyIHtcbiAgICBwcml2YXRlIF9sYXllcnM6IE1hcDxBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllciwgUHJvbWlzZTxUcmFuc2l0TGF5ZXIgfCBCaWN5Y2xpbmdMYXllcj4+ID1cbiAgICAgICAgbmV3IE1hcDxBZ21UcmFuc2l0TGF5ZXIgfCBBZ21CaWN5Y2xpbmdMYXllciwgUHJvbWlzZTxUcmFuc2l0TGF5ZXIgfCBCaWN5Y2xpbmdMYXllcj4+KCk7XG5cbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF93cmFwcGVyOiBHb29nbGVNYXBzQVBJV3JhcHBlcikge31cblxuICAgIC8qKlxuICAgICAqIEFkZHMgYSB0cmFuc2l0IGxheWVyIHRvIGEgbWFwIGluc3RhbmNlLlxuICAgICAqIEBwYXJhbSB7QWdtVHJhbnNpdExheWVyfSBsYXllciAtIGEgVHJhbnNpdExheWVyIG9iamVjdFxuICAgICAqIEBwYXJhbSB7VHJhbnNpdExheWVyT3B0aW9uc30gb3B0aW9ucyAtIFRyYW5zaXRMYXllck9wdGlvbnMgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBhZGRUcmFuc2l0TGF5ZXIobGF5ZXI6IEFnbVRyYW5zaXRMYXllciwgb3B0aW9uczogVHJhbnNpdExheWVyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuY3JlYXRlVHJhbnNpdExheWVyKG9wdGlvbnMpO1xuICAgICAgICB0aGlzLl9sYXllcnMuc2V0KGxheWVyLCBuZXdMYXllcik7XG4gICAgfVxuXG4gICAgLyoqXG4gICAgICogQWRkcyBhIGJpY3ljbGluZyBsYXllciB0byBhIG1hcCBpbnN0YW5jZS5cbiAgICAgKiBAcGFyYW0ge0FnbUJpY3ljbGluZ0xheWVyfSBsYXllciAtIGEgYmljeWNsaW5nIGxheWVyIG9iamVjdFxuICAgICAqIEBwYXJhbSB7QmljeWNsaW5nTGF5ZXJPcHRpb25zfSBvcHRpb25zIC0gQmljeWNsaW5nTGF5ZXIgb3B0aW9uc1xuICAgICAqIEByZXR1cm5zIHZvaWRcbiAgICAgKi9cbiAgICBhZGRCaWN5Y2xpbmdMYXllcihsYXllcjogQWdtQmljeWNsaW5nTGF5ZXIsIG9wdGlvbnM6IEJpY3ljbGluZ0xheWVyT3B0aW9ucyk6IHZvaWQge1xuICAgICAgICBjb25zdCBuZXdMYXllciA9IHRoaXMuX3dyYXBwZXIuY3JlYXRlQmljeWNsaW5nTGF5ZXIob3B0aW9ucyk7XG4gICAgICAgIHRoaXMuX2xheWVycy5zZXQobGF5ZXIsIG5ld0xheWVyKTtcbiAgICB9XG5cbiAgICAvKipcbiAgICAgKiBEZWxldGVzIGEgbWFwIGxheWVyXG4gICAgICogQHBhcmFtIHtBZ21UcmFuc2l0TGF5ZXJ8QWdtQmljeWNsaW5nTGF5ZXJ9IGxheWVyIC0gdGhlIGxheWVyIHRvIGRlbGV0ZVxuICAgICAqIEByZXR1cm5zICBQcm9taXNlPHZvaWQ+XG4gICAgICovXG4gICAgZGVsZXRlTGF5ZXIobGF5ZXI6IEFnbVRyYW5zaXRMYXllciB8IEFnbUJpY3ljbGluZ0xheWVyKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGN1cnJlbnRMYXllciA9PiB7XG4gICAgICAgICAgICBjdXJyZW50TGF5ZXIuc2V0TWFwKG51bGwpO1xuICAgICAgICAgICAgdGhpcy5fbGF5ZXJzLmRlbGV0ZShsYXllcik7XG4gICAgICAgIH0pO1xuICAgIH1cblxuICAgIC8qKlxuICAgICAqIEhpZGUvU2hvdyBhIGdvb2dsZSBtYXAgbGF5ZXJcbiAgICAgKiBAcGFyYW0geyBBZ21UcmFuc2l0TGF5ZXJ8QWdtQmljeWNsaW5nTGF5ZXJ9IGxheWVyIC0gdGhlIGxheWVyIHRvIGhpZGUvc2hvd1xuICAgICAqIEBwYXJhbSB7VHJhbnNpdExheWVyT3B0aW9uc3xCaWN5Y2xpbmdMYXllck9wdGlvbnN9IG9wdGlvbnMgLSB1c2VkIHRvIHNldCB2aXNpYmlsaXR5IG9mIHRoZSBsYXllclxuICAgICAqIEByZXR1cm5zIFByb21pc2U8dm9pZD5cbiAgICAgKi9cbiAgICB0b2dnbGVMYXllclZpc2liaWxpdHkobGF5ZXI6IEFnbVRyYW5zaXRMYXllciB8IEFnbUJpY3ljbGluZ0xheWVyLCBvcHRpb25zOiBUcmFuc2l0TGF5ZXJPcHRpb25zIHwgQmljeWNsaW5nTGF5ZXJPcHRpb25zKTogUHJvbWlzZTx2b2lkPiB7XG4gICAgICAgIHJldHVybiB0aGlzLl9sYXllcnMuZ2V0KGxheWVyKS50aGVuKGN1cnJlbnRMYXllciA9PiB7XG4gICAgICAgICAgICBpZiAoIW9wdGlvbnMudmlzaWJsZSkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRMYXllci5zZXRNYXAobnVsbCk7XG4gICAgICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgIHJldHVybiB0aGlzLl93cmFwcGVyLmdldE5hdGl2ZU1hcCgpLnRoZW4oIChtYXA6IEdvb2dsZU1hcCkgPT4ge1xuICAgICAgICAgICAgICAgICAgIGN1cnJlbnRMYXllci5zZXRNYXAobWFwKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG4gICAgfVxufVxuIl19