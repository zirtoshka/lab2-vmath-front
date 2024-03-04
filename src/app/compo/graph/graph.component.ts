import {Component} from '@angular/core';
import * as JXG from 'jsxgraph';
import {GeometryElement} from "jsxgraph";
import {color} from "chart.js/helpers";


@Component({
  selector: 'app-graph',
  standalone: true,
  imports: [],
  templateUrl: './graph.component.html',
  styleUrl: './graph.component.css'
})
export class GraphComponent {
  board!: JXG.Board;
  lines: GeometryElement[] = [];

  ngOnInit() {
    this.board = this.boardInit();


    // return -2.7 * Math.pow(x, 3) - 1.48 * Math.pow(x, 2) + 19.23 * x + 6.35;
    // }, -10, 10]);

  }

  draw1fun() {
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return -2.7 * x * x * x - 1.48 * x * x + 19.23 * x + 6.35;
    }, -10, 10], {
      strokeColor: '#002aff' // Красный цвет для линии графика
    }));
  }

  draw2fun() {
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return x * x * x - x + 4;
    }, -10, 10], {
      strokeColor: '#002aff' // Красный цвет для линии графика
    }));
  }

  draw3fun() {
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return 5*Math.log10(x+2)-3;
    }, -10, 10], {
      strokeColor: '#002aff' // Красный цвет для линии графика
    }));
  }

  clearBoard() {
    for (const object of this.lines) {
      this.board.removeObject(object);
    }

  }

  drawline(event: any) {
    // alert(event)
    this.clearBoard();
    if (event == 1) {
      this.draw1fun();

    } else if (event == 2) {
      this.draw2fun();
    } else if (event == 3) {
      this.draw3fun();
    }
  }


  boardInit() {
    return JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [-5, 25, 5, -20],
      grid: true,
      showCopyright: false,
      axis: true,
      defaultAxes: {
        x: {
          ticks: {
            drawZero: true,
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          name: 'X',
          withLabel: true,
          color: 'black',
          label: {
            position: 'rt',
            offset: [7, 10],
            anchorX: 'right',
            color: 'black'
          }
        },
        y: {
          ticks: {
            majorHeight: 5,
            minTicksDistance: 1,
            strokeColor: 'black',
          },
          color: 'black',
          withLabel: true,
          name: 'Y',
          label: {
            position: 'rt',
            offset: [-15, 10],
            anchorY: 'top',
            color: "black",

          }
        }
      },
      description: 'super-puper graph',


    });
  }

}
