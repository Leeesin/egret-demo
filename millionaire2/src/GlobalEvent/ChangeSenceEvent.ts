class ChangeSceneEvent extends egret.Event {
    // public static GET_SCORE: string = 'getScore'
    public static UN_LOCK: string = 'unLock'

    public static CHANGE_SCENE: string = "changeScene";
    
    public static RESET: string = "reset";

    public eventType: any;//事件类型
    public obj: any;//对象
    public score: number
    public constructor(type: string, bubbles: boolean = false, cancelable: boolean = false) {
        super(type, bubbles, cancelable);
    }
}