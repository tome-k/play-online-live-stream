import React, { Component } from "react";
import { StatusBar, View } from "react-native";
import { GameEngine } from "react-native-game-engine";
import { Physics, CreateBox, MoveBox, TargetHit, CleanBoxes, NewSpinShow } from "./systems";
import Matter from "matter-js";
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import LocationPulseLoader from "../components/animation/PulseLoader";
import GameDashBoard from "../components/GameDashBoard";
import GameHeaderBar from "../components/GameHeaderBar";
import GameBottomBar from "../components/GameBottomBar";
import { getspinArray } from "./data/levelData";

Matter.Common.isElement = () => false; //-- Overriding this function because the original references HTMLElement

export default class GamePlay extends Component {

  constructor() {
    super();
    this.state = {
      running: true,
      score: 0
    };
    this.gameEngine = null;
    this.entities = this.setupWorld();
  }

  gameStop = () => {
    this.setState({
      running: false
    });
  };

  resetGame = () => {
    //resetPipes();
    this.gameEngine.swap(this.setupWorld());
    this.setState({
      running: true,
      score: 0
    });
  }
  onEvent = (e) => {
    switch (e.type) {
      case 'game-over':
        this.gameStop();
        break;
      case 'score-50':
        this.setState({ score: this.state.score + 50 });
    }
  }

  gameStart() {
    setInterval(()=>{
      const random = (Math.floor(Math.random() * 10000) % wp("70"))+wp('10');
      const targetPosition = { x: random, y: hp("89") };
      const spinInfoData = getspinArray()[Math.floor(Math.random() * 10) % 4];
      NewSpinShow(targetPosition, spinInfoData);
    }, 2000);
  }

  componentDidMount() {
    this.gameStart();
  }

  setupWorld = () => {
    const random = Math.floor(Math.random() * 10000) % wp("100");
    const targetPosition = { x: random, y: hp("89") };
    const width = wp("100");
    const height = hp("100");
    const boxSize = Math.trunc(Math.max(width, height) * 0.075);

    const engine = Matter.Engine.create({ enableSleeping: false });
    const world = engine.world;
    const body = Matter.Bodies.rectangle(width / 2, -1000, boxSize, boxSize, { frictionAir: 0.021 });
    const floor = Matter.Bodies.rectangle(width / 2, height - boxSize / 2, width, boxSize, { isStatic: true });
    const constraint = Matter.Constraint.create({
      label: "Drag Constraint",
      pointA: { x: 0, y: 0 },
      pointB: { x: 0, y: 0 },
      length: 0.01,
      stiffness: 0.1,
      angularStiffness: 1
    });

    Matter.World.add(world, [body, floor]);
    Matter.World.addConstraint(world, constraint);
    // Matter.Events.on(engine, 'collisionStart', (event) => {
    //   let pairs = event.pairs;
    //   this.gameEngine.dispatch({ type: "game-over"});
    // });
    return {
      physics: { engine: engine, world: world, constraint: constraint },
      targetPosition: targetPosition
    };
  };

  render() {
    return (
      <View style={{
        flex: 1
      }}>
        <GameEngine
          style={{ zIndex: 3 }}
          ref={(ref) => { this.gameEngine = ref; }}
          onEvent={this.onEvent}
          systems={[Physics, CreateBox, TargetHit, CleanBoxes]}
          running={this.state.running}
          entities={this.entities}>
          <StatusBar hidden={true}/>
        </GameEngine>
        <GameDashBoard addSpinCoin={this.state.score}/>
        <GameHeaderBar/>
        <GameBottomBar/>
        <LocationPulseLoader/>
      </View>
    );
  }
}
