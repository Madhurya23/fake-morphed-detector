'''import numpy as np
import tensorflow as tf
import cv2
from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.applications import MobileNetV2
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import (
    Dense,
    Dropout,
    BatchNormalization,
    GlobalAveragePooling2D
)

from tensorflow.keras.preprocessing.image import ImageDataGenerator
from tensorflow.keras.callbacks import EarlyStopping

from sklearn.utils.class_weight import compute_class_weight

# -------------------------
# DATASET PATH
# -------------------------
dataset_path = "dataset_stage1"

# -------------------------
# SHARPENING FUNCTION

# -------------------------
# DATA AUGMENTATION
# -------------------------
data_gen = ImageDataGenerator(
    preprocessing_function=preprocess_input,
    validation_split=0.2,

    horizontal_flip=True,

    rotation_range=3,
    zoom_range=0.05,
    shear_range=0.05,

    brightness_range=[0.95, 1.05]
)

# -------------------------
# TRAIN SET
# -------------------------
train = data_gen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode="categorical",
    subset="training",
    shuffle=True
)

# -------------------------
# VALIDATION SET
# -------------------------
val = data_gen.flow_from_directory(
    dataset_path,
    target_size=(224, 224),
    batch_size=32,
    class_mode="categorical",
    subset="validation",
    shuffle=False
)

print("Class indices:", train.class_indices)

# -------------------------
# CLASS WEIGHTS
# -------------------------
class_weights = compute_class_weight(
    class_weight="balanced",
    classes=np.unique(train.classes),
    y=train.classes
)

class_weights = dict(enumerate(class_weights))

print("Class weights:", class_weights)

# -------------------------
# EARLY STOPPING
# -------------------------
early_stop = EarlyStopping(
    monitor='val_loss',
    patience=3,
    restore_best_weights=True
)

# -------------------------
# BASE MODEL
# -------------------------
base_model = MobileNetV2(
    include_top=False,
    weights="imagenet",
    input_shape=(224,224,3)
)

# Freeze most layers
for layer in base_model.layers[:-20]:
    layer.trainable = False

# -------------------------
# MODEL
# -------------------------
model = Sequential([

    base_model,

    GlobalAveragePooling2D(),

    Dense(256, activation="relu"),
    BatchNormalization(),
    Dropout(0.5),

    Dense(128, activation="relu"),
    Dropout(0.3),

    Dense(2, activation="softmax")
])

# -------------------------
# COMPILE
# -------------------------
model.compile(
    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.0001
    ),

    loss=tf.keras.losses.CategoricalCrossentropy(
        label_smoothing=0.1
    ),

    metrics=["accuracy"]
)

# -------------------------
# TRAIN
# -------------------------
history = model.fit(

    train,

    epochs=8,

    validation_data=val,

    class_weight=class_weights,

    callbacks=[early_stop]
)

# -------------------------
# SAVE MODEL
# -------------------------
model.save("models/stage1_real_fake.h5")

print("✅ Stage 1 model saved successfully!")
'''

import numpy as np
import tensorflow as tf

from tensorflow.keras.applications.mobilenet_v2 import preprocess_input
from tensorflow.keras.applications import MobileNetV2

from tensorflow.keras.models import Sequential

from tensorflow.keras.layers import (
    Dense,
    Dropout,
    BatchNormalization,
    GlobalAveragePooling2D
)

from tensorflow.keras.preprocessing.image import ImageDataGenerator

from tensorflow.keras.callbacks import (
    EarlyStopping,
    ReduceLROnPlateau
)

from sklearn.utils.class_weight import compute_class_weight

# -------------------------
# DATASET PATH
# -------------------------
dataset_path = "dataset_stage1"

# -------------------------
# DATA AUGMENTATION
# -------------------------
data_gen = ImageDataGenerator(

    preprocessing_function=preprocess_input,

    validation_split=0.2,

    horizontal_flip=True,

    rotation_range=20,

    zoom_range=0.2,

    width_shift_range=0.15,
    height_shift_range=0.15,

    shear_range=0.15,

    brightness_range=[0.6, 1.4]
)

# -------------------------
# TRAIN SET
# -------------------------
train = data_gen.flow_from_directory(

    dataset_path,

    target_size=(224, 224),

    batch_size=32,

    class_mode="categorical",

    subset="training",

    shuffle=True
)

# -------------------------
# VALIDATION SET
# -------------------------
val = data_gen.flow_from_directory(

    dataset_path,

    target_size=(224, 224),

    batch_size=32,

    class_mode="categorical",

    subset="validation",

    shuffle=False
)

print("Class indices:", train.class_indices)

# -------------------------
# CLASS WEIGHTS
# -------------------------
class_weights = compute_class_weight(

    class_weight="balanced",

    classes=np.unique(train.classes),

    y=train.classes
)

class_weights = dict(enumerate(class_weights))

print("Class weights:", class_weights)

# -------------------------
# CALLBACKS
# -------------------------
early_stop = EarlyStopping(

    monitor='val_loss',

    patience=4,

    restore_best_weights=True
)

reduce_lr = ReduceLROnPlateau(

    monitor='val_loss',

    factor=0.5,

    patience=2,

    verbose=1
)

# -------------------------
# BASE MODEL
# -------------------------
base_model = MobileNetV2(

    include_top=False,

    weights="imagenet",

    input_shape=(224,224,3)
)

# Freeze most layers
for layer in base_model.layers[:-20]:

    layer.trainable = False

# -------------------------
# MODEL
# -------------------------
model = Sequential([

    base_model,

    GlobalAveragePooling2D(),

    Dense(256, activation="relu"),
    BatchNormalization(),
    Dropout(0.5),

    Dense(128, activation="relu"),
    Dropout(0.4),

    Dense(2, activation="softmax")
])

# -------------------------
# COMPILE
# -------------------------
model.compile(

    optimizer=tf.keras.optimizers.Adam(
        learning_rate=0.0001
    ),

    loss=tf.keras.losses.CategoricalCrossentropy(
        label_smoothing=0.1
    ),

    metrics=["accuracy"]
)

# -------------------------
# TRAIN
# -------------------------
history = model.fit(

    train,

    epochs=8,

    validation_data=val,

    class_weight=class_weights,

    callbacks=[
        early_stop,
        reduce_lr
    ]
)

# -------------------------
# SAVE MODEL
# -------------------------
model.save("models/stage1_real_fake.keras")

print("✅ Stage 1 model saved successfully!")