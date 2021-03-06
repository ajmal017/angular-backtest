import { Component, ViewChild, NO_ERRORS_SCHEMA } from "@angular/core";
import { HighlightMaxComponent, HighlightDateMaxComponent, HighlightMinComponent, HighlightDateMinComponent, HighlightAvgComponent, HighlightStdComponent, HighlightComponent } from './highlight.component';
import { TestBed, ComponentFixture, waitForAsync } from '@angular/core/testing';

@Component({
  selector: 'parent',
  template: '<p>x</p>'
})
class TestWrapperComponent {
  @ViewChild(HighlightComponent, {static: true})
  public highlight: HighlightComponent;
}

describe('HighlightComponent', () => {

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [
        TestWrapperComponent,
        HighlightMaxComponent,
        HighlightDateMaxComponent,
        HighlightMinComponent,
        HighlightDateMinComponent,
        HighlightAvgComponent,
        HighlightStdComponent
      ]
    });
  }));

  const ACC = "ACC";

  it('Can instantiate a HighlighMaxComponent', () => {
    TestBed.overrideComponent(TestWrapperComponent, {
      set: {
        template: "<highlight-max sourceName='" + ACC + "'></highlight-max>"
      }
    }).compileComponents();
    const fixture: ComponentFixture<TestWrapperComponent>
      = TestBed.createComponent(TestWrapperComponent);
    fixture.detectChanges();

    let highlightMaxComponent: HighlightMaxComponent
      = <HighlightMaxComponent> fixture.componentInstance.highlight;

    expect(highlightMaxComponent).toBeTruthy();
    expect(highlightMaxComponent.sourceName).toBe(ACC);
  });

  it('Can instantiate a HighlighDateMaxComponent', () => {
    TestBed.overrideComponent(TestWrapperComponent, {
      set: {
        template: `<highlight-date-max sourceName="ACC"></highlight-date-max>`
      }
    }).compileComponents();
    const fixture: ComponentFixture<TestWrapperComponent>
      = TestBed.createComponent(TestWrapperComponent);
    fixture.detectChanges();

    let highlightDateMaxComponent: HighlightDateMaxComponent
      = <HighlightDateMaxComponent> fixture.componentInstance.highlight;

    expect(highlightDateMaxComponent).toBeTruthy();
    expect(highlightDateMaxComponent.sourceName).toBe("ACC");
  });

  it('Can instantiate a HighlighMinComponent', () => {
    TestBed.overrideComponent(TestWrapperComponent, {
      set: {
        template: `<highlight-min sourceName="ACC"></highlight-min>`
      }
    }).compileComponents();
    const fixture: ComponentFixture<TestWrapperComponent>
      = TestBed.createComponent(TestWrapperComponent);
    fixture.detectChanges();

    let highlightMinComponent: HighlightMinComponent
      = <HighlightMinComponent> fixture.componentInstance.highlight;

    expect(highlightMinComponent).toBeTruthy();
    expect(highlightMinComponent.sourceName).toBe("ACC");
  });

  it('Can instantiate a HighlighDateMinComponent', () => {
    TestBed.overrideComponent(TestWrapperComponent, {
      set: {
        template: `<highlight-date-min sourceName="ACC"></highlight-date-min>`
      }
    }).compileComponents();
    const fixture: ComponentFixture<TestWrapperComponent>
      = TestBed.createComponent(TestWrapperComponent);
    fixture.detectChanges();

    let highlightDateMinComponent: HighlightDateMinComponent
      = <HighlightDateMinComponent> fixture.componentInstance.highlight;

    expect(highlightDateMinComponent).toBeTruthy();
    expect(highlightDateMinComponent.sourceName).toBe("ACC");
  });

  it('Can instantiate a HighlighAvgComponent', () => {
    TestBed.overrideComponent(TestWrapperComponent, {
      set: {
        template: `<highlight-avg sourceName="ACC"></highlight-avg>`
      }
    }).compileComponents();
    const fixture: ComponentFixture<TestWrapperComponent>
      = TestBed.createComponent(TestWrapperComponent);
    fixture.detectChanges();

    let highlightAvgComponent: HighlightAvgComponent
      = <HighlightAvgComponent> fixture.componentInstance.highlight;

    expect(highlightAvgComponent).toBeTruthy();
    expect(highlightAvgComponent.sourceName).toBe("ACC");
  });

});
