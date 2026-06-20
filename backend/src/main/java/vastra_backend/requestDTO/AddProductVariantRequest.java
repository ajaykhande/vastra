package vastra_backend.requestDTO;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.Data;
import vastra_backend.enums.Size;

@Data
public class AddProductVariantRequest {

    @NotNull(message = "Size is required")
    private Size size;

    @PositiveOrZero(message = "Stock must be greater than 0")
    private int stock;

}
