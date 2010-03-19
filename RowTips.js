Ext.ns('Ext.ux.grid');

Ext.ux.grid.RowTips = function(tipCfg){
    //if function, set it as updater
    if(typeof tipCfg == 'function'){
        this.tipUpdater = tipCfg;
    }else if(typeof tipCfg == 'string'){
        //if string, get the field value
        this.tipUpdater = function(tip, grid, record){
            var text = record.get(tipCfg);
            if(text !== ''){
                tip.body.update(text);
            }else{
                return false;
            }
        };
    }
};
Ext.ux.grid.RowTips.prototype = {
    init:function(grid){
        this.grid = grid;
        this.grid.on('render', this.createTip, this);
    },
    createTip : function(){
        this.tip = new Ext.ToolTip({
            view: this.grid.getView(),
            target: this.grid.getView().mainBody,
            delegate: '.x-grid3-row',
            trackMouse: true,
            renderTo: document.body,
            listeners: {
                beforeshow: function(tip) {
                    //rowIndex
                    var rowIndex = tip.triggerElement.rowIndex;
                    var record = this.grid.store.getAt(rowIndex);
                    return this.tipUpdater(tip, this.grid, record);//return false to hide tooltip
                },
                scope:this
            }
        });
    }
};