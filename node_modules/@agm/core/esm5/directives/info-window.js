import * as tslib_1 from "tslib";
import { Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChange } from '@angular/core';
import { InfoWindowManager } from '../services/managers/info-window-manager';
var infoWindowId = 0;
/**
 * AgmInfoWindow renders a info window inside a {@link AgmMarker} or standalone.
 *
 * ### Example
 * ```typescript
 * import { Component } from '@angular/core';
 *
 * @Component({
 *  selector: 'my-map-cmp',
 *  styles: [`
 *    .agm-map-container {
 *      height: 300px;
 *    }
 * `],
 *  template: `
 *    <agm-map [latitude]="lat" [longitude]="lng" [zoom]="zoom">
 *      <agm-marker [latitude]="lat" [longitude]="lng" [label]="'M'">
 *        <agm-info-window [disableAutoPan]="true">
 *          Hi, this is the content of the <strong>info window</strong>
 *        </agm-info-window>
 *      </agm-marker>
 *    </agm-map>
 *  `
 * })
 * ```
 */
var AgmInfoWindow = /** @class */ (function () {
    function AgmInfoWindow(_infoWindowManager, _el) {
        this._infoWindowManager = _infoWindowManager;
        this._el = _el;
        /**
         * Sets the open state for the InfoWindow. You can also call the open() and close() methods.
         */
        this.isOpen = false;
        /**
         * Emits an event when the info window is closed.
         */
        this.infoWindowClose = new EventEmitter();
        this._infoWindowAddedToManager = false;
        this._id = (infoWindowId++).toString();
    }
    AgmInfoWindow_1 = AgmInfoWindow;
    AgmInfoWindow.prototype.ngOnInit = function () {
        this.content = this._el.nativeElement.querySelector('.agm-info-window-content');
        this._infoWindowManager.addInfoWindow(this);
        this._infoWindowAddedToManager = true;
        this._updateOpenState();
        this._registerEventListeners();
    };
    /** @internal */
    AgmInfoWindow.prototype.ngOnChanges = function (changes) {
        if (!this._infoWindowAddedToManager) {
            return;
        }
        if ((changes['latitude'] || changes['longitude']) && typeof this.latitude === 'number' &&
            typeof this.longitude === 'number') {
            this._infoWindowManager.setPosition(this);
        }
        if (changes['zIndex']) {
            this._infoWindowManager.setZIndex(this);
        }
        if (changes['isOpen']) {
            this._updateOpenState();
        }
        this._setInfoWindowOptions(changes);
    };
    AgmInfoWindow.prototype._registerEventListeners = function () {
        var _this = this;
        this._infoWindowManager.createEventObservable('closeclick', this).subscribe(function () {
            _this.isOpen = false;
            _this.infoWindowClose.emit();
        });
    };
    AgmInfoWindow.prototype._updateOpenState = function () {
        this.isOpen ? this.open() : this.close();
    };
    AgmInfoWindow.prototype._setInfoWindowOptions = function (changes) {
        var options = {};
        var optionKeys = Object.keys(changes).filter(function (k) { return AgmInfoWindow_1._infoWindowOptionsInputs.indexOf(k) !== -1; });
        optionKeys.forEach(function (k) { options[k] = changes[k].currentValue; });
        this._infoWindowManager.setOptions(this, options);
    };
    /**
     * Opens the info window.
     */
    AgmInfoWindow.prototype.open = function () { return this._infoWindowManager.open(this); };
    /**
     * Closes the info window.
     */
    AgmInfoWindow.prototype.close = function () {
        var _this = this;
        return this._infoWindowManager.close(this).then(function () { _this.infoWindowClose.emit(); });
    };
    /** @internal */
    AgmInfoWindow.prototype.id = function () { return this._id; };
    /** @internal */
    AgmInfoWindow.prototype.toString = function () { return 'AgmInfoWindow-' + this._id.toString(); };
    /** @internal */
    AgmInfoWindow.prototype.ngOnDestroy = function () { this._infoWindowManager.deleteInfoWindow(this); };
    var AgmInfoWindow_1;
    AgmInfoWindow._infoWindowOptionsInputs = ['disableAutoPan', 'maxWidth'];
    AgmInfoWindow.ctorParameters = function () { return [
        { type: InfoWindowManager },
        { type: ElementRef }
    ]; };
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmInfoWindow.prototype, "latitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmInfoWindow.prototype, "longitude", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Boolean)
    ], AgmInfoWindow.prototype, "disableAutoPan", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmInfoWindow.prototype, "zIndex", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Number)
    ], AgmInfoWindow.prototype, "maxWidth", void 0);
    tslib_1.__decorate([
        Input(),
        tslib_1.__metadata("design:type", Object)
    ], AgmInfoWindow.prototype, "isOpen", void 0);
    tslib_1.__decorate([
        Output(),
        tslib_1.__metadata("design:type", EventEmitter)
    ], AgmInfoWindow.prototype, "infoWindowClose", void 0);
    AgmInfoWindow = AgmInfoWindow_1 = tslib_1.__decorate([
        Component({
            selector: 'agm-info-window',
            template: "<div class='agm-info-window-content'>\n      <ng-content></ng-content>\n    </div>\n  "
        }),
        tslib_1.__metadata("design:paramtypes", [InfoWindowManager, ElementRef])
    ], AgmInfoWindow);
    return AgmInfoWindow;
}());
export { AgmInfoWindow };
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5mby13aW5kb3cuanMiLCJzb3VyY2VSb290Ijoibmc6Ly9AYWdtL2NvcmUvIiwic291cmNlcyI6WyJkaXJlY3RpdmVzL2luZm8td2luZG93LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLFVBQVUsRUFBRSxZQUFZLEVBQUUsS0FBSyxFQUFFLFNBQVMsRUFBRSxTQUFTLEVBQUUsTUFBTSxFQUFFLE1BQU0sRUFBRSxZQUFZLEVBQUUsTUFBTSxlQUFlLENBQUM7QUFFL0gsT0FBTyxFQUFFLGlCQUFpQixFQUFFLE1BQU0sMENBQTBDLENBQUM7QUFJN0UsSUFBSSxZQUFZLEdBQUcsQ0FBQyxDQUFDO0FBRXJCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBUUg7SUEwREUsdUJBQW9CLGtCQUFxQyxFQUFVLEdBQWU7UUFBOUQsdUJBQWtCLEdBQWxCLGtCQUFrQixDQUFtQjtRQUFVLFFBQUcsR0FBSCxHQUFHLENBQVk7UUFkbEY7O1dBRUc7UUFDTSxXQUFNLEdBQUcsS0FBSyxDQUFDO1FBRXhCOztXQUVHO1FBQ08sb0JBQWUsR0FBdUIsSUFBSSxZQUFZLEVBQVEsQ0FBQztRQUdqRSw4QkFBeUIsR0FBRyxLQUFLLENBQUM7UUFDbEMsUUFBRyxHQUFXLENBQUMsWUFBWSxFQUFFLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztJQUVtQyxDQUFDO3NCQTFEM0UsYUFBYTtJQTREeEIsZ0NBQVEsR0FBUjtRQUNFLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsYUFBYSxDQUFDLDBCQUEwQixDQUFDLENBQUM7UUFDaEYsSUFBSSxDQUFDLGtCQUFrQixDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMseUJBQXlCLEdBQUcsSUFBSSxDQUFDO1FBQ3RDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO1FBQ3hCLElBQUksQ0FBQyx1QkFBdUIsRUFB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SUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDOztJQXRFbEQsc0NBQXdCLEdBQWEsQ0FBQyxnQkFBZ0IsRUFBRSxVQUFVLENBQUMsQ0FBQzs7Z0JBSTNDLGlCQUFpQjtnQkFBZSxVQUFVOztJQXJEekU7UUFBUixLQUFLLEVBQUU7O21EQUFrQjtJQU1qQjtRQUFSLEtBQUssRUFBRTs7b0RBQW1CO0lBTWxCO1FBQVIsS0FBSyxFQUFFOzt5REFBeUI7SUFReEI7UUFBUixLQUFLLEVBQUU7O2lEQUFnQjtJQU9mO1FBQVIsS0FBSyxFQUFFOzttREFBa0I7SUFlakI7UUFBUixLQUFLLEVBQUU7O2lEQUFnQjtJQUtkO1FBQVQsTUFBTSxFQUFFOzBDQUFrQixZQUFZOzBEQUFrQztJQXBEOUQsYUFBYTtRQVB6QixTQUFTLENBQUM7WUFDVCxRQUFRLEVBQUUsaUJBQWlCO1lBQzNCLFFBQVEsRUFBRSx3RkFHVDtTQUNGLENBQUM7aURBMkR3QyxpQkFBaUIsRUFBZSxVQUFVO09BMUR2RSxhQUFhLENBNkh6QjtJQUFELG9CQUFDO0NBQUEsQUE3SEQsSUE2SEM7U0E3SFksYUFBYSIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbXBvbmVudCwgRWxlbWVudFJlZiwgRXZlbnRFbWl0dGVyLCBJbnB1dCwgT25DaGFuZ2VzLCBPbkRlc3Ryb3ksIE9uSW5pdCwgT3V0cHV0LCBTaW1wbGVDaGFuZ2UgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcblxuaW1wb3J0IHsgSW5mb1dpbmRvd01hbmFnZXIgfSBmcm9tICcuLi9zZXJ2aWNlcy9tYW5hZ2Vycy9pbmZvLXdpbmRvdy1tYW5hZ2VyJztcblxuaW1wb3J0IHsgQWdtTWFya2VyIH0gZnJvbSAnLi9tYXJrZXInO1xuXG5sZXQgaW5mb1dpbmRvd0lkID0gMDtcblxuLyoqXG4gKiBBZ21JbmZvV2luZG93IHJlbmRlcnMgYSBpbmZvIHdpbmRvdyBpbnNpZGUgYSB7QGxpbmsgQWdtTWFya2VyfSBvciBzdGFuZGFsb25lLlxuICpcbiAqICMjIyBFeGFtcGxlXG4gKiBgYGB0eXBlc2NyaXB0XG4gKiBpbXBvcnQgeyBDb21wb25lbnQgfSBmcm9tICdAYW5ndWxhci9jb3JlJztcbiAqXG4gKiBAQ29tcG9uZW50KHtcbiAqICBzZWxlY3RvcjogJ215LW1hcC1jbXAnLFxuICogIHN0eWxlczogW2BcbiAqICAgIC5hZ20tbWFwLWNvbnRhaW5lciB7XG4gKiAgICAgIGhlaWdodDogMzAwcHg7XG4gKiAgICB9XG4gKiBgXSxcbiAqICB0ZW1wbGF0ZTogYFxuICogICAgPGFnbS1tYXAgW2xhdGl0dWRlXT1cImxhdFwiIFtsb25naXR1ZGVdPVwibG5nXCIgW3pvb21dPVwiem9vbVwiPlxuICogICAgICA8YWdtLW1hcmtlciBbbGF0aXR1ZGVdPVwibGF0XCIgW2xvbmdpdHVkZV09XCJsbmdcIiBbbGFiZWxdPVwiJ00nXCI+XG4gKiAgICAgICAgPGFnbS1pbmZvLXdpbmRvdyBbZGlzYWJsZUF1dG9QYW5dPVwidHJ1ZVwiPlxuICogICAgICAgICAgSGksIHRoaXMgaXMgdGhlIGNvbnRlbnQgb2YgdGhlIDxzdHJvbmc+aW5mbyB3aW5kb3c8L3N0cm9uZz5cbiAqICAgICAgICA8L2FnbS1pbmZvLXdpbmRvdz5cbiAqICAgICAgPC9hZ20tbWFya2VyPlxuICogICAgPC9hZ20tbWFwPlxuICogIGBcbiAqIH0pXG4gKiBgYGBcbiAqL1xuQENvbXBvbmVudCh7XG4gIHNlbGVjdG9yOiAnYWdtLWluZm8td2luZG93JyxcbiAgdGVtcGxhdGU6IGA8ZGl2IGNsYXNzPSdhZ20taW5mby13aW5kb3ctY29udGVudCc+XG4gICAgICA8bmctY29udGVudD48L25nLWNvbnRlbnQ+XG4gICAgPC9kaXY+XG4gIGAsXG59KVxuZXhwb3J0IGNsYXNzIEFnbUluZm9XaW5kb3cgaW1wbGVtZW50cyBPbkRlc3Ryb3ksIE9uQ2hhbmdlcywgT25Jbml0IHtcbiAgLyoqXG4gICAqIFRoZSBsYXRpdHVkZSBwb3NpdGlvbiBvZiB0aGUgaW5mbyB3aW5kb3cgKG9ubHkgdXNlZnVsbCBpZiB5b3UgdXNlIGl0IG91c2lkZSBvZiBhIHtAbGlua1xuICAgKiBBZ21NYXJrZXJ9KS5cbiAgICovXG4gIEBJbnB1dCgpIGxhdGl0dWRlOiBudW1iZXI7XG5cbiAgLyoqXG4gICAqIFRoZSBsb25naXR1ZGUgcG9zaXRpb24gb2YgdGhlIGluZm8gd2luZG93IChvbmx5IHVzZWZ1bGwgaWYgeW91IHVzZSBpdCBvdXNpZGUgb2YgYSB7QGxpbmtcbiAgICogQWdtTWFya2VyfSkuXG4gICAqL1xuICBASW5wdXQoKSBsb25naXR1ZGU6IG51bWJlcjtcblxuICAvKipcbiAgICogRGlzYWJsZSBhdXRvLXBhbiBvbiBvcGVuLiBCeSBkZWZhdWx0LCB0aGUgaW5mbyB3aW5kb3cgd2lsbCBwYW4gdGhlIG1hcCBzbyB0aGF0IGl0IGlzIGZ1bGx5XG4gICAqIHZpc2libGUgd2hlbiBpdCBvcGVucy5cbiAgICovXG4gIEBJbnB1dCgpIGRpc2FibGVBdXRvUGFuOiBib29sZWFuO1xuXG4gIC8qKlxuICAgKiBBbGwgSW5mb1dpbmRvd3MgYXJlIGRpc3BsYXllZCBvbiB0aGUgbWFwIGluIG9yZGVyIG9mIHRoZWlyIHpJbmRleCwgd2l0aCBoaWdoZXIgdmFsdWVzXG4gICAqIGRpc3BsYXlpbmcgaW4gZnJvbnQgb2YgSW5mb1dpbmRvd3Mgd2l0aCBsb3dlciB2YWx1ZXMuIEJ5IGRlZmF1bHQsIEluZm9XaW5kb3dzIGFyZSBkaXNwbGF5ZWRcbiAgICogYWNjb3JkaW5nIHRvIHRoZWlyIGxhdGl0dWRlLCB3aXRoIEluZm9XaW5kb3dzIG9mIGxvd2VyIGxhdGl0dWRlcyBhcHBlYXJpbmcgaW4gZnJvbnQgb2ZcbiAgICogSW5mb1dpbmRvd3MgYXQgaGlnaGVyIGxhdGl0dWRlcy4gSW5mb1dpbmRvd3MgYXJlIGFsd2F5cyBkaXNwbGF5ZWQgaW4gZnJvbnQgb2YgbWFya2Vycy5cbiAgICovXG4gIEBJbnB1dCgpIHpJbmRleDogbnVtYmVyO1xuXG4gIC8qKlxuICAgKiBNYXhpbXVtIHdpZHRoIG9mIHRoZSBpbmZvd2luZG93LCByZWdhcmRsZXNzIG9mIGNvbnRlbnQncyB3aWR0aC4gVGhpcyB2YWx1ZSBpcyBvbmx5IGNvbnNpZGVyZWRcbiAgICogaWYgaXQgaXMgc2V0IGJlZm9yZSBhIGNhbGwgdG8gb3Blbi4gVG8gY2hhbmdlIHRoZSBtYXhpbXVtIHdpZHRoIHdoZW4gY2hhbmdpbmcgY29udGVudCwgY2FsbFxuICAgKiBjbG9zZSwgdXBkYXRlIG1heFdpZHRoLCBhbmQgdGhlbiBvcGVuLlxuICAgKi9cbiAgQElucHV0KCkgbWF4V2lkdGg6IG51bWJlcjtcblxuICAvKipcbiAgICogSG9sZHMgdGhlIG1hcmtlciB0aGF0IGlzIHRoZSBob3N0IG9mIHRoZSBpbmZvIHdpbmRvdyAoaWYgYXZhaWxhYmxlKVxuICAgKi9cbiAgaG9zdE1hcmtlcjogQWdtTWFya2VyO1xuXG4gIC8qKlxuICAgKiBIb2xkcyB0aGUgbmF0aXZlIGVsZW1lbnQgdGhhdCBpcyB1c2VkIGZvciB0aGUgaW5mbyB3aW5kb3cgY29udGVudC5cbiAgICovXG4gIGNvbnRlbnQ6IE5vZGU7XG5cbiAgLyoqXG4gICAqIFNldHMgdGhlIG9wZW4gc3RhdGUgZm9yIHRoZSBJbmZvV2luZG93LiBZb3UgY2FuIGFsc28gY2FsbCB0aGUgb3BlbigpIGFuZCBjbG9zZSgpIG1ldGhvZHMuXG4gICAqL1xuICBASW5wdXQoKSBpc09wZW4gPSBmYWxzZTtcblxuICAvKipcbiAgICogRW1pdHMgYW4gZXZlbnQgd2hlbiB0aGUgaW5mbyB3aW5kb3cgaXMgY2xvc2VkLlxuICAgKi9cbiAgQE91dHB1dCgpIGluZm9XaW5kb3dDbG9zZTogRXZlbnRFbWl0dGVyPHZvaWQ+ID0gbmV3IEV2ZW50RW1pdHRlcjx2b2lkPigpO1xuXG4gIHByaXZhdGUgc3RhdGljIF9pbmZvV2luZG93T3B0aW9uc0lucHV0czogc3RyaW5nW10gPSBbJ2Rpc2FibGVBdXRvUGFuJywgJ21heFdpZHRoJ107XG4gIHByaXZhdGUgX2luZm9XaW5kb3dBZGRlZFRvTWFuYWdlciA9IGZhbHNlO1xuICBwcml2YXRlIF9pZDogc3RyaW5nID0gKGluZm9XaW5kb3dJZCsrKS50b1N0cmluZygpO1xuXG4gIGNvbnN0cnVjdG9yKHByaXZhdGUgX2luZm9XaW5kb3dNYW5hZ2VyOiBJbmZvV2luZG93TWFuYWdlciwgcHJpdmF0ZSBfZWw6IEVsZW1lbnRSZWYpIHt9XG5cbiAgbmdPbkluaXQoKSB7XG4gICAgdGhpcy5jb250ZW50ID0gdGhpcy5fZWwubmF0aXZlRWxlbWVudC5xdWVyeVNlbGVjdG9yKCcuYWdtLWluZm8td2luZG93LWNvbnRlbnQnKTtcbiAgICB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5hZGRJbmZvV2luZG93KHRoaXMpO1xuICAgIHRoaXMuX2luZm9XaW5kb3dBZGRlZFRvTWFuYWdlciA9IHRydWU7XG4gICAgdGhpcy5fdXBkYXRlT3BlblN0YXRlKCk7XG4gICAgdGhpcy5fcmVnaXN0ZXJFdmVudExpc3RlbmVycygpO1xuICB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICBuZ09uQ2hhbmdlcyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGlmICghdGhpcy5faW5mb1dpbmRvd0FkZGVkVG9NYW5hZ2VyKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgoY2hhbmdlc1snbGF0aXR1ZGUnXSB8fCBjaGFuZ2VzWydsb25naXR1ZGUnXSkgJiYgdHlwZW9mIHRoaXMubGF0aXR1ZGUgPT09ICdudW1iZXInICYmXG4gICAgICAgIHR5cGVvZiB0aGlzLmxvbmdpdHVkZSA9PT0gJ251bWJlcicpIHtcbiAgICAgIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLnNldFBvc2l0aW9uKHRoaXMpO1xuICAgIH1cbiAgICBpZiAoY2hhbmdlc1snekluZGV4J10pIHtcbiAgICAgIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLnNldFpJbmRleCh0aGlzKTtcbiAgICB9XG4gICAgaWYgKGNoYW5nZXNbJ2lzT3BlbiddKSB7XG4gICAgICB0aGlzLl91cGRhdGVPcGVuU3RhdGUoKTtcbiAgICB9XG4gICAgdGhpcy5fc2V0SW5mb1dpbmRvd09wdGlvbnMoY2hhbmdlcyk7XG4gIH1cblxuICBwcml2YXRlIF9yZWdpc3RlckV2ZW50TGlzdGVuZXJzKCkge1xuICAgIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLmNyZWF0ZUV2ZW50T2JzZXJ2YWJsZSgnY2xvc2VjbGljaycsIHRoaXMpLnN1YnNjcmliZSgoKSA9PiB7XG4gICAgICB0aGlzLmlzT3BlbiA9IGZhbHNlO1xuICAgICAgdGhpcy5pbmZvV2luZG93Q2xvc2UuZW1pdCgpO1xuICAgIH0pO1xuICB9XG5cbiAgcHJpdmF0ZSBfdXBkYXRlT3BlblN0YXRlKCkge1xuICAgIHRoaXMuaXNPcGVuID8gdGhpcy5vcGVuKCkgOiB0aGlzLmNsb3NlKCk7XG4gIH1cblxuICBwcml2YXRlIF9zZXRJbmZvV2luZG93T3B0aW9ucyhjaGFuZ2VzOiB7W2tleTogc3RyaW5nXTogU2ltcGxlQ2hhbmdlfSkge1xuICAgIGxldCBvcHRpb25zOiB7W3Byb3BOYW1lOiBzdHJpbmddOiBhbnl9ID0ge307XG4gICAgbGV0IG9wdGlvbktleXMgPSBPYmplY3Qua2V5cyhjaGFuZ2VzKS5maWx0ZXIoXG4gICAgICAgIGsgPT4gQWdtSW5mb1dpbmRvdy5faW5mb1dpbmRvd09wdGlvbnNJbnB1dHMuaW5kZXhPZihrKSAhPT0gLTEpO1xuICAgIG9wdGlvbktleXMuZm9yRWFjaCgoaykgPT4geyBvcHRpb25zW2tdID0gY2hhbmdlc1trXS5jdXJyZW50VmFsdWU7IH0pO1xuICAgIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLnNldE9wdGlvbnModGhpcywgb3B0aW9ucyk7XG4gIH1cblxuICAvKipcbiAgICogT3BlbnMgdGhlIGluZm8gd2luZG93LlxuICAgKi9cbiAgb3BlbigpOiBQcm9taXNlPHZvaWQ+IHsgcmV0dXJuIHRoaXMuX2luZm9XaW5kb3dNYW5hZ2VyLm9wZW4odGhpcyk7IH1cblxuICAvKipcbiAgICogQ2xvc2VzIHRoZSBpbmZvIHdpbmRvdy5cbiAgICovXG4gIGNsb3NlKCk6IFByb21pc2U8dm9pZD4ge1xuICAgIHJldHVybiB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5jbG9zZSh0aGlzKS50aGVuKCgpID0+IHsgdGhpcy5pbmZvV2luZG93Q2xvc2UuZW1pdCgpOyB9KTtcbiAgfVxuXG4gIC8qKiBAaW50ZXJuYWwgKi9cbiAgaWQoKTogc3RyaW5nIHsgcmV0dXJuIHRoaXMuX2lkOyB9XG5cbiAgLyoqIEBpbnRlcm5hbCAqL1xuICB0b1N0cmluZygpOiBzdHJpbmcgeyByZXR1cm4gJ0FnbUluZm9XaW5kb3ctJyArIHRoaXMuX2lkLnRvU3RyaW5nKCk7IH1cblxuICAvKiogQGludGVybmFsICovXG4gIG5nT25EZXN0cm95KCkgeyB0aGlzLl9pbmZvV2luZG93TWFuYWdlci5kZWxldGVJbmZvV2luZG93KHRoaXMpOyB9XG59XG4iXX0=