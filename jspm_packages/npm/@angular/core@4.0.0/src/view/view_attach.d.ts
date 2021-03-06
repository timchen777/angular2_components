/**
 * @license
 * Copyright Google Inc. All Rights Reserved.
 *
 * Use of this source code is governed by an MIT-style license that can be
 * found in the LICENSE file at https://angular.io/license
 */
import { ElementData, ViewData } from './types';
export declare function attachEmbeddedView(parentView: ViewData, elementData: ElementData, viewIndex: number, view: ViewData): void;
export declare function detachEmbeddedView(elementData: ElementData, viewIndex: number): ViewData;
export declare function moveEmbeddedView(elementData: ElementData, oldViewIndex: number, newViewIndex: number): ViewData;
export declare function renderDetachView(view: ViewData): void;
