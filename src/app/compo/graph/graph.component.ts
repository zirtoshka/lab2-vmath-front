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
    this.board = this.boardInit(-5, 5, 5, -5);


    // return -2.7 * Math.pow(x, 3) - 1.48 * Math.pow(x, 2) + 19.23 * x + 6.35;
    // }, -10, 10]);

  }

  draw1fun() {
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return -2.7 * x * x * x - 1.48 * x * x + 19.23 * x + 6.35;
    }, -10, 10], {
      strokeColor: '#6600ff',
      strokeWidth: 2// Красный цвет для линии графика
    }));
  }

  draw2fun() {
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return x * x * x - x + 4;
    }, -10, 10], {
      strokeColor: '#c500fd',
      strokeWidth: 2// Красный цвет для линии графика
    }));
  }

  draw3fun() {
    this.lines.push(this.board.create('functiongraph', [function (x: number) {
      return 5 * Math.log10(x + 2) - 3;
    }, -10, 10], {
      strokeColor: '#002aff',
      strokeWidth: 2// Красный цвет для линии графика
    }));
  }

  draw4fun() {

    // Функция для первого уравнения системы
    const equation1 = function (x: number) {
      return (Math.atan(x*x)-0.3)/x;
    };
    const equation2 = function (x: number) {
      return (10*Math.PI+10*Math.atan(x*x)-0.3)/(10*x);
    };
    const equation3 = function (x: number) {
      return (20*Math.PI+10*Math.atan(x*x)-0.3)/(10*x);
    };
    const equation4 = function (x: number) {
      return (-10*Math.PI+10*Math.atan(x*x)-0.3)/(10*x);
    };
    const equation5 = function (x: number) {
      return (-20*Math.PI+10*Math.atan(x*x)-0.3)/(10*x);
    };
    // Функция для второго уравнения системы
    const equation20 = function (x: number) {
      return Math.pow((1 - 0.9 * x * x) / 2, 0.5);
    };
    const equation21 = function (x: number) {
      return -Math.pow((1 - 0.9 * x * x) / 2, 0.5);
    };

    // Рисуем графики функций
    this.lines.push(this.board.create('functiongraph', [equation2, -10, 10], {strokeColor: '#1a5901', strokeWidth: 2}));
    this.lines.push(this.board.create('functiongraph', [equation3, -10, 10], {strokeColor: '#1a5901', strokeWidth: 2}));
    this.lines.push(this.board.create('functiongraph', [equation4, -10, 10], {strokeColor: '#1a5901', strokeWidth: 2}));
    this.lines.push(this.board.create('functiongraph', [equation5, -10, 10], {strokeColor: '#1a5901', strokeWidth: 2}));

    this.lines.push(this.board.create('functiongraph', [equation1, -10, 10], {strokeColor: '#1a5901', strokeWidth: 2}));
    this.lines.push(this.board.create('functiongraph', [equation20, -10, 10], {strokeColor: '#ff0000', strokeWidth: 2}));
    this.lines.push(this.board.create('functiongraph', [equation21, -10, 10], {strokeColor: '#ff0000', strokeWidth: 2}));


  }

  draw5fun() {

    // Функция для первого уравнения системы
    const equation1 = function (x: number) {
      return (0.7-0.2*x*x)/(1+0.1*x);
    };
    const equation21 = function (x: number) {
      return Math.pow((0.3-0.1*x*x-x)/0.2,0.5)
    };
    const equation22 = function (x: number) {
      return -Math.pow((0.3-0.1*x*x-x)/0.2,0.5)
    };



    this.lines.push(this.board.create('functiongraph', [equation1, -10, 10], {strokeColor: '#1a5901', strokeWidth: 2}));
    this.lines.push(this.board.create('functiongraph', [equation21, -10, 5], {strokeColor: '#fc1437', strokeWidth: 2}));
    this.lines.push(this.board.create('functiongraph', [equation22, -10, 5], {strokeColor: '#fc1437', strokeWidth: 2}));


  }

  clearBoard() {
    for (const object of this.lines) {
      this.board.removeObject(object);
    }

  }

  drawline(event: any) {
    // alert(event)
    this.clearBoard();
    // if (event != 4) {
    //   this.boardInit(-5, 25, 5, -20);
    // } else {
    //   alert(11);
    //   this.boardInit(-5, 5, 5, -5);
    // }
    if (event == 1) {
      this.draw1fun();
    } else if (event == 2) {
      this.draw2fun();
    } else if (event == 3) {
      this.draw3fun();
    } else if (event == 4) {
      this.draw4fun();
    }else if(event==5){
      this.draw5fun();
    }
  }


  boardInit(a: number, b: number, c: number, d: number) {
    return JXG.JSXGraph.initBoard('jxgbox', {
      boundingbox: [a, b, c, d],
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
