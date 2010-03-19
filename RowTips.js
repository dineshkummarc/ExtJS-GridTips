Ext.ns('Ext.ux.grid');

Ext.ux.grid.RowTips = function(tipCfg){
    //if function, set it as updater
    if(typeof tipCfg == 'function'){
        this.tipUpdater = tipCfg;
    }else if(typeof tipCfg == 'string'){
        //if string, get the field value
        this.tipRenderer= function(grid, record){
            var text = record.get(tipCfg);
            return text; //return '' -> no tooltip
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
                    var rowIndex = tip.triggerElement.rowIndex,
                        record = this.grid.store.getAt(rowIndex),
                        update = this.tipRenderer(this.grid, record);//return '' to hide tooltip
                    
                    if(update !== ''){
                        tip.body.update(update);
                    }else{
                        return false;
                    }
                },
                scope:this
            }
        });
    }
};