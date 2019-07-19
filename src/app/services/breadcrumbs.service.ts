import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Interface represent a breadcrumbs node
 */
export interface BreadcrumbsTreeNode {
  // Name / Title
  name: string;
  // URL
  url: string;
  // Next child
  child?: BreadcrumbsTreeNode;
  // Prev parent
  parent?: BreadcrumbsTreeNode;
};

/**
 * Injectable Breadcrumbs Service
 */
@Injectable({
  providedIn: 'root'
})
export class BreadcrumbsService {

  // The Breadcrumbs tree
  public tree: BreadcrumbsTreeNode;
  // onChange Observer
  public onChange: Subject<BreadcrumbsTreeNode> = new Subject<BreadcrumbsTreeNode>();

  /**
   * Add new Breadcrum item.
   * 
   * @param name Crumb name (used as title)
   * @param url Crumb URL 
   */
  addChild(name: string, url: string): void {
    let child = {
      name: name,
      url:url,
      parent: this.lastChild
    };

    if (!this.tree) {
      this.tree = child;
    } else {
      this.lastChild.child = child;
    }

    this.onChange.next(this.tree);
  }

  /**
   * Remove a Breadcrum item and his childs by URL
   * 
   * @param url Crumb URL to remove
   */
  removeChildByURL(url: string): void {
    let cChild = this.tree;
    while(cChild) {
      if (cChild.url == url) {
        delete cChild.parent.child;
        cChild = null;
      } else {
        cChild = cChild.child;
      }
    }

    this.onChange.next(this.tree);
  }

  /**
   * Start a new Breadcrumb tree, add this crumb and remove old ones
   * 
   * @param name Crumb name (used as title)
   * @param url Crumb URL
   */
  firstChild(name: string, url: string): void {
    this.tree = null;
    this.addChild(name, url);
  }

  /**
   * Search the last Breadcrumb child and return the refereance
   * 
   * @returns The last BreadcrumbsTreeNode or null
   */
  private get lastChild(): BreadcrumbsTreeNode {
    let cChild = this.tree;
    while(cChild) {
      if (cChild.child) {
        cChild = cChild.child;
      } else {
        return cChild;
      }
    }
    return null;
  }
}
